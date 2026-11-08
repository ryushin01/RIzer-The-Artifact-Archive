"use client";

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { IconArrowLeft, IconArrowRight, IconButton, IconPause, IconPin, IconPlay, MonoLabel } from "@/shared/ui";
import { useMessages } from "@/shared/i18n";
import { pad2 } from "@/shared/lib/format";

import { markersToggled, next, paused, played, prev, selectTour } from "../model/slice";

/** 안내 투어 조작: 재생·멈춤, 이전·다음, 주석 표시 켜기·끄기 */
export function TourControls() {
  const dispatch = useDispatch();
  const t = useMessages().tour;
  const { ids, activeId, playing, markersVisible } = useSelector(selectTour);
  if (ids.length === 0) return null;
  const index = activeId ? ids.indexOf(activeId) : -1;

  return (
    <Bar role="group" aria-label={t.label}>
      <IconButton
        type="button"
        aria-label={playing ? t.pause : t.play}
        onClick={() => dispatch(playing ? paused() : played())}
      >
        {playing ? <IconPause /> : <IconPlay />}
      </IconButton>
      <IconButton type="button" aria-label={t.prev} onClick={() => dispatch(prev())} disabled={index <= 0}>
        <IconArrowLeft />
      </IconButton>
      <Counter aria-live="polite" aria-atomic="true">
        {index >= 0 ? `${pad2(index + 1)} / ${pad2(ids.length)}` : t.count(ids.length)}
      </Counter>
      <IconButton type="button" aria-label={t.next} onClick={() => dispatch(next())} disabled={index >= ids.length - 1}>
        <IconArrowRight />
      </IconButton>
      <IconButton
        type="button"
        aria-label={t.markers}
        aria-pressed={markersVisible}
        $active={markersVisible}
        onClick={() => dispatch(markersToggled())}
      >
        <IconPin />
      </IconButton>
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Counter = styled(MonoLabel)`
  min-width: 76px;
  text-align: center;
  color: ${({ theme }) => theme.color.text};
`;
