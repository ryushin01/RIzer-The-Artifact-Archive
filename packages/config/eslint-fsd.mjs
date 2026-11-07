// Feature-Sliced Design v2.1 경계 규칙. 앱의 src 폴더를 읽어 슬라이스마다 규칙을 만든다.
// Next.js 앱이므로 계층 이름은 _app·_pages이고, src/app은 Next 라우트(_pages를 다시 내보내기만 함)다.
// 위 계층은 아래 계층만 가져오고, 같은 계층의 다른 슬라이스는 가져오지 않으며,
// 슬라이스 밖에서는 공개 API(index.ts, 엔티티의 @x)로만 가져온다.
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const LAYERS = ["shared", "entities", "features", "widgets", "_pages", "_app"];
const SLICED = ["entities", "features", "widgets", "_pages"];
const SERVER_MESSAGE =
  "서버 코드(server, db)는 화면 조각에서 직접 가져오지 않습니다. _pages나 features의 api에서 읽어 props로 넘기세요.";

const pattern = (regex, message) => ({ regex, message });

function publicApi(layer) {
  if (layer === "entities") {
    return pattern(
      "^@/entities/[^/]+/(?!index\\.server$|@x/[^/]+$).+",
      "엔티티는 공개 API(@/entities/<이름>, /index.server, /@x/<소비자>)로만 가져옵니다.",
    );
  }
  return pattern(
    `^@/${layer}/[^/]+/(?!index\\.server$).+`,
    `${layer}는 공개 API(@/${layer}/<이름>)로만 가져옵니다.`,
  );
}

function rulesFor(layer, slice, { allowServer }) {
  const index = LAYERS.indexOf(layer);
  const upper = LAYERS.slice(index + 1);
  const patterns = [
    ...upper.map((u) => pattern(`^@/${u}(/|$)`, `${layer}에서 위 계층(${u})을 가져올 수 없습니다.`)),
    ...SLICED.filter((l) => LAYERS.indexOf(l) < index).map(publicApi),
  ];
  if (slice) {
    if (layer === "entities") {
      patterns.push(
        pattern(
          `^@/entities/(?!${slice}(/|$))[^/]+$`,
          "다른 엔티티는 @x 공개 API(@/entities/<이름>/@x/<이 엔티티>)로만 가져옵니다.",
        ),
        pattern(`^@/entities/(?!${slice}(/|$))[^/]+/@x/(?!${slice}$)`, "@x는 그 이름의 엔티티에서만 가져옵니다."),
      );
    } else {
      patterns.push(
        pattern(
          `^@/${layer}/(?!${slice}(/|$))`,
          `같은 계층(${layer})의 다른 슬라이스를 가져올 수 없습니다. 위 계층에서 조합하세요.`,
        ),
      );
    }
    patterns.push(pattern(`^@/${layer}/${slice}(/|$)`, "슬라이스 안에서는 상대 경로로 가져옵니다."));
    patterns.push(pattern("^(\\.\\./){3,}", "슬라이스 밖으로 나가는 상대 경로는 쓰지 않습니다."));
  }
  if (!allowServer) patterns.push(pattern("^@/(server|db)(/|$)", SERVER_MESSAGE));
  return { "no-restricted-imports": ["error", { patterns }] };
}

function subdirs(dir) {
  return existsSync(dir)
    ? readdirSync(dir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => e.name)
    : [];
}

/** @param {string} appDir 앱 폴더 (import.meta.dirname) */
export function fsdConfig(appDir) {
  const src = path.join(appDir, "src");
  const blocks = [
    { files: ["src/shared/**"], rules: rulesFor("shared", null, { allowServer: false }) },
    { files: ["src/_app/**"], rules: rulesFor("_app", null, { allowServer: true }) },
    // Next 라우트 파일은 _pages·_app을 다시 내보내기만 한다.
    {
      files: ["src/app/**"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              pattern("^@/(widgets|features|entities)(/|$)", "라우트 파일은 _pages·_app만 다시 내보냅니다."),
              pattern("^@/_pages/[^/]+/(?!index\\.server$).+", "_pages는 공개 API(@/_pages/<이름>)로만 가져옵니다."),
            ],
          },
        ],
      },
    },
  ];
  for (const layer of SLICED) {
    for (const slice of subdirs(path.join(src, layer))) {
      const glob = `src/${layer}/${slice}/**`;
      // 서버 데이터는 _pages와 features의 서버 액션(api)만 읽는다.
      blocks.push({ files: [glob], rules: rulesFor(layer, slice, { allowServer: layer === "_pages" }) });
      if (layer === "features") {
        blocks.push({
          files: [`src/features/${slice}/api/**`],
          rules: rulesFor(layer, slice, { allowServer: true }),
        });
      }
    }
  }
  // 서버 코드는 화면을 모른다. 엔티티의 model과 shared/lib·config만 가져온다.
  blocks.push({
    files: ["src/server/**", "src/db/**", "scripts/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            pattern("^@/(features|widgets|_pages|_app|app)(/|$)", "서버 코드는 화면 계층을 가져올 수 없습니다."),
            pattern("^@/shared/ui(/|$)", "서버 코드는 화면 컴포넌트를 가져올 수 없습니다."),
          ],
        },
      ],
    },
  });
  return blocks;
}
