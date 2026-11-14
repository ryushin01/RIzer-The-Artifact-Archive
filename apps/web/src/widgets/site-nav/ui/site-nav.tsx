"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { MotionToggle } from "@/features/motion-preference";
import { media } from "@/shared/config";
import { otherLocalePath, stripLocale, useLocale, useLocalePath, useMessages } from "@/shared/i18n";

const SECTIONS = ["collection", "realms", "timeline", "faq"] as const;

/**
 * 화면 아래에 떠 있는 알약 모양 메뉴와 맨 위의 스크롤 진행선.
 * 첫 화면에서는 지금 보고 있는 섹션을 aria-current로 표시하고, 다른 화면에서는 첫 화면의 섹션으로 보낸다.
 */
export function SiteNav() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useMessages().nav;
  const path = useLocalePath();
  const home = stripLocale(pathname) === "/";
  const [active, setActive] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // 스크롤 진행선: 렌더링 없이 transform만 바꾼다.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    if (!home) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [home]);

  return (
    <>
      <Progress aria-hidden>
        <div ref={barRef} />
      </Progress>
      <Nav aria-label={t.label}>
        <Logo href={path("/")} aria-label={t.home}>
          <Image src="/brand/logo.png" alt="" width={30} height={30} />
        </Logo>
        <Links>
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={home ? `#${id}` : path(`/#${id}`)} aria-current={home && active === id ? "true" : undefined}>
                {t[id]}
              </a>
            </li>
          ))}
          <li>
            <Link href={path("/artifacts")} aria-current={stripLocale(pathname).startsWith("/artifacts") ? "page" : undefined} className="archive">
              {t.archive}
            </Link>
          </li>
          <li>
            {/* 언어판은 루트 레이아웃이 달라 전체 페이지로 옮겨 간다. */}
            <a href={otherLocalePath(locale, pathname)} lang={locale === "en" ? "ko" : "en"} className="lang">
              {t.switchTo}
            </a>
          </li>
        </Links>
        <MotionToggle />
      </Nav>
    </>
  );
}

const Progress = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: ${({ theme }) => theme.z.nav};
  pointer-events: none;
  div {
    height: 100%;
    transform-origin: left;
    transform: scaleX(0);
    background: linear-gradient(90deg, #2846c8, ${({ theme }) => theme.color.accent});
  }
`;
const Nav = styled.nav`
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.z.nav};
  display: flex;
  align-items: center;
  gap: 6px;
  max-width: calc(100vw - 24px);
  padding: 6px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: rgba(14, 14, 16, 0.82);
  border: 1px solid ${({ theme }) => theme.color.line};
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  ${media.md} {
    bottom: 24px;
  }
`;
const Logo = styled(Link)`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: none;
  border-radius: 10px;
  background: ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.ink};
  text-decoration: none;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
`;
const Links = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
  a {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 12px;
    border-radius: 10px;
    text-decoration: none;
    white-space: nowrap;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 12px;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.color.muted};
    transition: background 0.2s, color 0.2s;
    &:hover {
      color: ${({ theme }) => theme.color.text};
    }
    &[aria-current] {
      background: rgba(255, 255, 255, 0.1);
      color: ${({ theme }) => theme.color.text};
    }
    &.archive {
      color: ${({ theme }) => theme.color.text};
    }
  }
  li:nth-child(-n + 4) {
    display: none;
    ${media.md} {
      display: block;
    }
  }
`;
