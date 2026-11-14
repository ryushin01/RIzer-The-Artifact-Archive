import { LinearIntegrator, type SsgoiConfig, type Transition, withOverride } from "@ssgoi/react";
import { fade, zoom } from "@ssgoi/react/view-transitions";

// 설정 객체는 컴포넌트 밖에 둔다. 렌더마다 새로 만들면 전환 엔진이 다시 만들어져 저장된 스크롤 위치를 잃는다.

/** 영어 화면(/en/...)도 같은 규칙을 쓰도록 접두어를 떼고 비교한다. */
export const stripLocale = (path: string) => path.replace(/^\/en(?=\/|$)/, "") || "/";

const middleware: SsgoiConfig["middleware"] = (from, to) => ({ from: stripLocale(from), to: stripLocale(to) });

/**
 * 규칙. 스크롤 위치도 규칙이 정한다. 쌍 규칙(from·to)은 새로 가는 화면을 맨 위에서 열고, 뒤로 가면 보던 자리로 돌려놓는다.
 * `on` 규칙은 범위 안끼리 오갈 때 두 화면 모두 처음 위치로 돌아가, 첫 화면 → 아카이브 → 뒤로에서 첫 화면이 맨 위로 갔다.
 *
 * 아카이브와 관련 유물의 카드를 누르면 카드 사진이 딥줌 뷰어로 커지며 상세 화면이 열린다.
 * 카드 사진에 data-zoom-exit-key, 뷰어 틀에 data-zoom-enter-key로 같은 slug를 단다. 나머지 이동은 fade.
 *
 * 첫 화면은 zoom에서 뺀다. 첫 화면의 히어로 바로가기와 아래쪽 컬렉션 카드가 같은 유물을 가리킬 수 있는데,
 * SSGOI는 누른 요소가 아니라 같은 키를 단 첫 요소에서 커지므로 화면 밖의 카드에서 커지는 일이 생긴다.
 */
const rules = (transition: (kind: "fade" | "zoom") => Transition) => [
  { priority: -100, from: "/**", to: "/**", transition: transition("fade") },
  { from: "/artifacts", to: "/artifacts/*", transition: transition("zoom") },
  // 상세 화면의 관련 유물 → 다른 유물. 방향은 방문 기록이 정한다.
  { from: "/artifacts/*", to: "/artifacts/*", transition: transition("zoom") },
];

export const motionConfig: SsgoiConfig = {
  middleware,
  transitions: rules((kind) => (kind === "zoom" ? zoom({ type: "expand" }) : fade())),
};

/** 한 프레임 안에 끝나는 fade. 움직임은 보이지 않고, 규칙의 스크롤 정책(뒤로 가면 보던 자리)은 그대로 쓴다. */
const instantFade = () =>
  withOverride(fade(), {
    forward: ({ animation }) => void animation.set({ integrator: new LinearIntegrator({ durationSec: 0.001 }) }),
    backward: ({ animation }) => void animation.set({ integrator: new LinearIntegrator({ durationSec: 0.001 }) }),
  });

/**
 * 움직임을 줄이면(운영체제 설정 또는 사이트의 움직임 버튼) 움직이지 않는다. SSGOI는 이 설정을 스스로 읽지 않는다.
 * 규칙을 비우면(transitions: []) 맞는 규칙이 없어 들어오는 화면이 늘 맨 위로 가므로, 뒤로 가도 아카이브의 보던 자리를
 * 잃었다. 같은 규칙을 두고 전환만 즉시 끝나게 한다. 움직이지 않으므로 종류는 fade 하나로 둔다.
 */
export const reducedConfig: SsgoiConfig = {
  middleware,
  transitions: rules(() => instantFade()),
};

export const selectConfig = (reduced: boolean) => (reduced ? reducedConfig : motionConfig);
