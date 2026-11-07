"use client";

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectReducedMotion } from "@/features/motion-preference";
import { theme } from "@/shared/config";

/**
 * 마우스를 따라오는 붉은 점. 시스템 커서는 그대로 두고 장식으로만 더한다.
 * 정밀 포인터(마우스)일 때만, 움직임을 끄지 않았을 때만 보인다.
 */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSelector(selectReducedMotion);

  useEffect(() => {
    if (reduced || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = ref.current;
    if (!dot) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let frame = 0;
    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      dot.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.dataset.visible = "true";
      const target = e.target as Element | null;
      dot.dataset.hover = target?.closest("a, button, [role='button'], input, select, label") ? "true" : "false";
    };
    const onLeave = () => (dot.dataset.visible = "false");
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  if (reduced) return null;
  return <Dot ref={ref} aria-hidden data-visible="false" />;
}

const Dot = styled.div`
  position: fixed;
  top: -7px;
  left: -7px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: ${theme.color.accent};
  box-shadow: 0 0 18px ${theme.color.accent};
  pointer-events: none;
  z-index: ${theme.z.cursor};
  opacity: 0;
  transition:
    opacity 0.3s,
    width 0.3s,
    height 0.3s,
    top 0.3s,
    left 0.3s;
  &[data-visible="true"] {
    opacity: 1;
  }
  &[data-hover="true"] {
    width: 34px;
    height: 34px;
    top: -17px;
    left: -17px;
    background: rgba(226, 40, 60, 0.35);
  }
  @media (hover: none), (pointer: coarse) {
    display: none;
  }
`;
