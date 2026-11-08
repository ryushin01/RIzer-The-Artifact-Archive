"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useMessages } from "@/shared/i18n";
import { pad2 } from "@/shared/lib/format";
import { GlowBackdrop, MonoLabel, RedDot } from "@/shared/ui";

const WORDS = ["A BLADE", "A VESSEL", "A RELIC"];

/**
 * 화면에 고정된 채 스크롤에 따라 단어가 바뀌는 문장.
 * 화면 낭독기에는 문장 전체를 한 번에 읽히고, 바뀌는 단어는 숨긴다.
 */
export function Statement() {
  const t = useMessages().statement;
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 0.999) : 0;
      setIndex(Math.floor(p * WORDS.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Section ref={ref} aria-labelledby="statement-title">
      <Sticky>
        <GlowBackdrop $intensity={0.55} />
        <h2 id="statement-title" className="sr-only">
          {t.title}
        </h2>
        <Inner aria-hidden>
          <MonoLabel>WHAT IF A LEGEND LEFT BEHIND…</MonoLabel>
          <Word key={index}>
            {WORDS[index]}
            <Dot />
          </Word>
          <Ko>{t.words[index]}</Ko>
          <Pager>
            {WORDS.map((w, i) => (
              <span key={w} data-active={i === index} />
            ))}
          </Pager>
          <MonoLabel>
            {pad2(index + 1)} / {pad2(WORDS.length)}
          </MonoLabel>
        </Inner>
      </Sticky>
    </Section>
  );
}

const Section = styled.section`
  position: relative;
  height: 300vh;
`;
const Sticky = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
`;
const Inner = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  gap: 18px;
  text-align: center;
  padding-inline: 16px;
`;
const Word = styled.p`
  position: relative;
  font-family: ${({ theme }) => theme.font.display};
  font-weight: 800;
  font-size: clamp(40px, 9vw, 140px);
  line-height: 1;
  letter-spacing: 0.02em;
  animation: rise 0.7s ${({ theme }) => theme.ease.out};
  @keyframes rise {
    from {
      opacity: 0;
      transform: translateY(24px);
      filter: blur(8px);
    }
  }
`;
const Dot = styled(RedDot)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 14px;
  height: 14px;
  transform: translate(-50%, -50%);
`;
const Ko = styled.p`
  font-size: clamp(16px, 2vw, 22px);
  color: ${({ theme }) => theme.color.muted};
`;
const Pager = styled.div`
  display: flex;
  gap: 6px;
  span {
    width: 18px;
    height: 3px;
    border-radius: 2px;
    background: ${({ theme }) => theme.color.lineStrong};
    transition: width 0.4s, background 0.4s;
  }
  span[data-active="true"] {
    width: 36px;
    background: ${({ theme }) => theme.color.text};
  }
`;
