import type { SsgoiConfig } from "@ssgoi/react";
import { fade, zoom } from "@ssgoi/react/view-transitions";

// 설정 객체는 컴포넌트 밖에 둔다. 렌더마다 새로 만들면 전환 엔진이 다시 만들어져 저장된 스크롤 위치를 잃는다.

/** 영어 화면(/en/...)도 같은 규칙을 쓰도록 접두어를 떼고 비교한다. */
export const stripLocale = (path: string) => path.replace(/^\/en(?=\/|$)/, "") || "/";

/**
 * 아카이브와 관련 유물의 카드를 누르면 카드 사진이 딥줌 뷰어로 커지며 상세 화면이 열린다.
 * 카드 사진에 data-zoom-exit-key, 뷰어 틀에 data-zoom-enter-key로 같은 slug를 단다. 나머지 이동은 fade.
 *
 * 첫 화면은 zoom에서 뺀다. 첫 화면의 히어로 바로가기와 아래쪽 컬렉션 카드가 같은 유물을 가리킬 수 있는데,
 * SSGOI는 누른 요소가 아니라 같은 키를 단 첫 요소에서 커지므로 화면 밖의 카드에서 커지는 일이 생긴다.
 */
export const motionConfig: SsgoiConfig = {
  middleware: (from, to) => ({ from: stripLocale(from), to: stripLocale(to) }),
  transitions: [
    { priority: -100, on: "/**", transition: fade() },
    { from: "/artifacts", to: "/artifacts/*", transition: zoom({ type: "expand" }) },
    // 상세 화면의 관련 유물 → 다른 유물. 방향은 방문 기록이 정한다.
    { from: "/artifacts/*", to: "/artifacts/*", transition: zoom({ type: "expand" }) },
  ],
};

/** 움직임을 줄이면(운영체제 설정 또는 사이트의 움직임 버튼) 화면 전환을 하지 않는다. SSGOI는 이 설정을 스스로 읽지 않는다. */
export const reducedConfig: SsgoiConfig = { transitions: [] };

export const selectConfig = (reduced: boolean) => (reduced ? reducedConfig : motionConfig);
