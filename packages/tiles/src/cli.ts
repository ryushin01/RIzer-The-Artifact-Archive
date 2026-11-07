// 딥줌 타일 생성 CLI. 서버리스 함수의 메모리·시간 제한을 넘는 큰 이미지는 이 명령으로 로컬이나 CI에서 자른다.
// 사용법: pnpm tiles <원본 이미지> <출력 폴더> [이름]
import path from "node:path";

import { generateDeepZoom } from "./index";

const [input, outDir, name = "image"] = process.argv.slice(2);
if (!input || !outDir) {
  console.error("사용법: pnpm tiles <원본 이미지> <출력 폴더> [이름]");
  process.exit(1);
}

const started = performance.now();
const result = await generateDeepZoom(path.resolve(input), path.resolve(outDir), { name });
const seconds = ((performance.now() - started) / 1000).toFixed(1);
console.log(
  `${result.width}×${result.height}px → 타일 ${result.tileCount}개 (${seconds}초)\n` +
    `DZI: ${path.join(outDir, result.dziPath)}\n대표 색: ${result.dominantColor}`,
);
