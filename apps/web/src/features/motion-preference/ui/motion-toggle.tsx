"use client";

import { useDispatch, useSelector } from "react-redux";

import { useMessages } from "@/shared/i18n";
import { IconButton, IconMotion, IconMotionOff } from "@/shared/ui";

import { selectReducedMotion, toggled } from "../model/slice";

/**
 * 움직임(스크롤 연출, 자동 투어, 커서 효과) 켜기·끄기. 움직이는 콘텐츠를 멈출 수 있어야 한다(KWCAG 6.2.2).
 * 버튼 이름은 그대로 두고 aria-pressed로 상태를 알린다.
 */
export function MotionToggle() {
  const dispatch = useDispatch();
  const t = useMessages().motion;
  const reduced = useSelector(selectReducedMotion);
  return (
    <IconButton
      type="button"
      aria-label={t.label}
      aria-pressed={!reduced}
      title={reduced ? t.on : t.off}
      $active={!reduced}
      onClick={() => dispatch(toggled())}
    >
      {reduced ? <IconMotionOff /> : <IconMotion />}
    </IconButton>
  );
}
