"use client";

import { useState } from "react";
import styled from "styled-components";

/**
 * 지금 연 주석으로 바로 오는 주소를 복사한다. 주소는 TourSync가 이미 `?note=N`으로 맞춰 둔다.
 * 결과는 화면 낭독기에도 알린다. 클립보드를 쓸 수 없으면 주소를 직접 복사하라고 안내한다.
 */
export function CopyNoteLink() {
  const [message, setMessage] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("이 주석으로 오는 링크를 복사했습니다.");
    } catch {
      setMessage("복사하지 못했습니다. 주소 표시줄의 주소를 복사해 주세요.");
    }
  };
  return (
    <Wrap>
      <button type="button" onClick={copy}>
        이 주석 링크 복사
      </button>
      <span role="status">{message}</span>
    </Wrap>
  );
}

const Wrap = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  button {
    min-height: 32px;
    padding: 4px 12px;
    border: 1px solid ${({ theme }) => theme.color.lineStrong};
    border-radius: 999px;
    background: none;
    color: inherit;
    font: inherit;
    font-size: 13px;
    cursor: pointer;
  }
  button:hover {
    border-color: ${({ theme }) => theme.color.text};
  }
  button:focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 2px;
  }
  span {
    font-size: 13px;
    color: ${({ theme }) => theme.color.muted};
  }
`;
