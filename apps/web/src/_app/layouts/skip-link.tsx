"use client";

import styled from "styled-components";

import { useMessages } from "@/shared/i18n";

/** 반복되는 메뉴를 건너뛰고 본문으로 간다(KWCAG 6.4.1). 초점을 받을 때만 보인다. */
export function SkipLink() {
  return <Skip href="#main">{useMessages().skipLink}</Skip>;
}

const Skip = styled.a`
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 100;
  padding: 12px 18px;
  border-radius: 8px;
  background: ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.ink};
  font-weight: 700;
  transform: translateY(-200%);
  &:focus {
    transform: none;
  }
`;
