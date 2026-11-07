"use client";

import { usePathname } from "next/navigation";

import { CursorDot } from "@/widgets/cursor-dot";
import { IntroGate } from "@/widgets/intro-gate";
import { SiteNav } from "@/widgets/site-nav";

/** 모든 화면에 공통인 떠 있는 요소들. 입장 화면은 첫 화면에서만 보인다. */
export function ClientChrome() {
  const pathname = usePathname();
  return (
    <>
      <SiteNav />
      <CursorDot />
      {pathname === "/" && <IntroGate />}
    </>
  );
}
