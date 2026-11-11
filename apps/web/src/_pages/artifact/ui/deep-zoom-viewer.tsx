"use client";

import type { Annotation, DeepZoomImage } from "@rizer/domain";
import type OpenSeadragon from "openseadragon";
import { useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { selected, selectTour, TourControls } from "@/features/annotation-tour";
import { selectReducedMotion } from "@/features/motion-preference";
import { media } from "@/shared/config";
import { useMessages } from "@/shared/i18n";
import { IconArrowLeft, IconArrowRight, IconButton, IconExpand, IconHome, IconMinus, IconPlus, MonoLabel } from "@/shared/ui";

import { padRect, regionToImageRect } from "../model/geometry";

type Props = { title: string; image: DeepZoomImage; imageAlt: string; annotations: Annotation[] };

/**
 * 딥줌 뷰어(OpenSeadragon). 화면에 보이는 타일만 내려받는다.
 * - 주석은 사진 위에 번호 버튼으로 얹는다. 실제 <button>이라 Tab으로 차례로 지나가며 고를 수 있다.
 * - 고른 주석(스토어의 activeId)으로 확대한다. 안내 투어(사가)도 같은 값을 바꾼다.
 * - 키보드: 사진에 초점을 두고 화살표로 움직이고, +/-로 확대·축소, 0으로 전체 보기.
 * - 끌기 없이 한 번 누르기로도 옮길 수 있게 이동 버튼을 둔다(KWCAG 6.5.1 단일 포인터).
 */
export function DeepZoomViewer({ title, image, imageAlt, annotations }: Props) {
  const t = useMessages().viewer;
  const dispatch = useDispatch();
  const { activeId, markersVisible } = useSelector(selectTour);
  const reduced = useSelector(selectReducedMotion);
  const hostRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const [ready, setReady] = useState(false);
  const [zoomPercent, setZoomPercent] = useState(100);
  const helpId = useId();
  const size = { width: image.width, height: image.height };

  useEffect(() => {
    let disposed = false;
    let unlisten = () => {};
    let unobserve = () => {};
    const sizeAtMount = { width: image.width, height: image.height };
    (async () => {
      const { default: OSD } = await import("openseadragon");
      if (disposed || !hostRef.current) return;
      const wideQuery = window.matchMedia("(min-width: 900px)");
      const viewer = OSD({
        element: hostRef.current,
        tileSources: image.dziUrl,
        crossOriginPolicy: "Anonymous",
        showNavigationControl: false,
        // 좁은 화면에서는 미니맵이 사진을 많이 가리므로 넓은 화면에서만 보인다(아래에서 너비 변화에 맞춘다).
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorAutoFade: false,
        navigatorBackground: "#050505",
        navigatorBorderColor: "rgba(244,242,238,0.4)",
        navigatorDisplayRegionColor: "#e2283c",
        visibilityRatio: 0.6,
        minZoomImageRatio: 0.7,
        maxZoomPixelRatio: 3,
        animationTime: document.documentElement.dataset.motion === "reduce" ? 0 : 1.1,
        springStiffness: 8,
        gestureSettingsMouse: { clickToZoom: false, scrollToZoom: true },
        placeholderFillStyle: image.dominantColor,
        immediateRender: false,
      });

      viewer.addHandler("open", () => {
        annotations.forEach((a, i) => {
          const el = document.createElement("div");
          el.className = "rz-region";
          el.dataset.id = a.id;
          const button = document.createElement("button");
          button.type = "button";
          button.className = "rz-marker";
          button.textContent = String(i + 1);
          button.setAttribute("aria-label", t.marker(i + 1, a.title));
          // OpenSeadragon이 끌기로 가로채지 않도록 포인터 누름이 뷰어로 올라가지 않게 한다.
          button.addEventListener("pointerdown", (e) => e.stopPropagation());
          button.addEventListener("click", () => dispatch(selected(a.id)));
          el.appendChild(button);
          const r = regionToImageRect(a.region, sizeAtMount);
          viewer.addOverlay({
            element: el,
            location: viewer.viewport.imageToViewportRectangle(r.x, r.y, r.width, r.height),
          });
        });
        setReady(true);
      });
      viewer.addHandler("zoom", () => {
        const z = viewer.viewport.viewportToImageZoom(viewer.viewport.getZoom(true));
        setZoomPercent(Math.round(z * 100));
      });
      // 위쪽 도구 막대와 아래쪽 줄(좁으면 두 줄로 넘어간다)에 사진과 주석 번호가 가리지 않게,
      // 실제 높이를 재서 여백으로 둔다. 줄이 바뀌거나 창 크기가 바뀌면 다시 잰다.
      const fitMargins = () => {
        const gap = 20; // 막대의 바깥 여백 12px + 사진과의 간격 8px
        viewer.viewport.setMargins({
          top: (toolbarRef.current?.offsetHeight ?? 44) + gap,
          bottom: (bottomRef.current?.offsetHeight ?? 44) + gap,
          left: 12,
          right: 12,
        });
        viewer.viewport.applyConstraints(true);
      };
      fitMargins();
      const observer = new ResizeObserver(fitMargins);
      [toolbarRef.current, bottomRef.current].forEach((el) => el && observer.observe(el));
      unobserve = () => observer.disconnect();
      // 창 너비가 바뀌어도 미니맵과 아래쪽 해상도 표시가 겹치지 않게 미니맵 표시를 맞춘다.
      const syncNavigator = () => viewer.navigator?.setVisible(wideQuery.matches);
      syncNavigator();
      wideQuery.addEventListener("change", syncNavigator);
      unlisten = () => wideQuery.removeEventListener("change", syncNavigator);
      viewerRef.current = viewer;
    })();
    return () => {
      disposed = true;
      unlisten();
      unobserve();
      viewerRef.current?.destroy();
      viewerRef.current = null;
    };
    // 이미지가 바뀔 때만 다시 만든다. 주석은 그 이미지와 함께 온다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.dziUrl]);

  // 고른 주석으로 확대하고 표시를 바꾼다.
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !ready) return;
    hostRef.current?.querySelectorAll<HTMLElement>(".rz-region").forEach((el) => {
      el.dataset.active = String(el.dataset.id === activeId);
    });
    const target = annotations.find((a) => a.id === activeId);
    if (!target) return;
    const r = padRect(regionToImageRect(target.region, size), size);
    viewer.viewport.fitBoundsWithConstraints(
      viewer.viewport.imageToViewportRectangle(r.x, r.y, r.width, r.height),
      reduced,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, ready]);

  const zoomBy = (factor: number) => viewerRef.current?.viewport.zoomBy(factor).applyConstraints(reduced);
  /** 보이는 폭·높이의 1/4만큼 옮긴다. dx·dy는 -1·0·1. */
  const pan = (dx: number, dy: number) => {
    const viewport = viewerRef.current?.viewport;
    if (!viewport) return;
    const bounds = viewport.getBounds();
    const center = viewport.getCenter();
    center.x += bounds.width * 0.25 * dx;
    center.y += bounds.height * 0.25 * dy;
    viewport.panTo(center, reduced).applyConstraints(reduced);
  };
  const home = () => {
    dispatch(selected(null));
    viewerRef.current?.viewport.goHome(reduced);
  };

  return (
    <Wrap aria-label={t.label(title)} $markers={markersVisible}>
      {/* 뷰어 안에 초점을 받는 캔버스와 주석 버튼이 있어 role="img"를 쓰지 않고, 사진 설명은 글로 둔다. */}
      <p className="sr-only">{t.photo}: {imageAlt}</p>
      <Stage
        ref={hostRef}
        aria-describedby={helpId}
        style={{ backgroundColor: image.dominantColor, backgroundImage: ready ? undefined : `url(${image.lqip})` }}
      />
      <p id={helpId} className="sr-only">
        {t.hint}
      </p>
      <Toolbar ref={toolbarRef}>
        <TourControls />
        <Zoom role="group" aria-label={t.zoomGroup}>
          <IconButton type="button" aria-label={t.zoomIn} onClick={() => zoomBy(1.6)} disabled={!ready}>
            <IconPlus />
          </IconButton>
          <ZoomLabel aria-live="off">{zoomPercent}%</ZoomLabel>
          <IconButton type="button" aria-label={t.zoomOut} onClick={() => zoomBy(1 / 1.6)} disabled={!ready}>
            <IconMinus />
          </IconButton>
          <IconButton type="button" aria-label={t.home} onClick={home} disabled={!ready}>
            <IconHome />
          </IconButton>
          <IconButton
            type="button"
            aria-label={t.fullscreen}
            onClick={() => viewerRef.current?.setFullScreen(!viewerRef.current.isFullPage())}
            disabled={!ready}
          >
            <IconExpand />
          </IconButton>
        </Zoom>
      </Toolbar>
      <Bottom ref={bottomRef}>
        <Pan role="group" aria-label={t.panGroup}>
          <IconButton type="button" aria-label={t.panLeft} onClick={() => pan(-1, 0)} disabled={!ready}>
            <IconArrowLeft />
          </IconButton>
          <IconButton type="button" aria-label={t.panUp} onClick={() => pan(0, -1)} disabled={!ready}>
            <IconArrowRight style={{ transform: "rotate(-90deg)" }} />
          </IconButton>
          <IconButton type="button" aria-label={t.panDown} onClick={() => pan(0, 1)} disabled={!ready}>
            <IconArrowRight style={{ transform: "rotate(90deg)" }} />
          </IconButton>
          <IconButton type="button" aria-label={t.panRight} onClick={() => pan(1, 0)} disabled={!ready}>
            <IconArrowRight />
          </IconButton>
        </Pan>
        <Resolution>
          <MonoLabel>
            <span className="full">
              {image.width.toLocaleString("ko-KR")} × {image.height.toLocaleString("ko-KR")} PX
            </span>
            <span className="short">
              {image.width}×{image.height}
            </span>
          </MonoLabel>
        </Resolution>
      </Bottom>
    </Wrap>
  );
}

const Wrap = styled.section<{ $markers: boolean }>`
  position: relative;
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.color.surface};

  /* OpenSeadragon이 오버레이마다 감싸는 div. 영역이 겹치면(한 영역이 다른 영역 안) 바깥 영역의 감싸개가
     안쪽 번호 버튼의 클릭을 가로채므로, 감싸개와 영역은 포인터를 통과시키고 번호 버튼만 받는다. */
  .openseadragon-overlay-wrapper {
    pointer-events: none;
  }
  .rz-region {
    display: ${({ $markers }) => ($markers ? "block" : "none")};
    border: 1px dashed rgba(244, 242, 238, 0.35);
    border-radius: 6px;
    transition: border-color 0.3s, background 0.3s;
    pointer-events: none;
  }
  .rz-region[data-active="true"] {
    border: 2px solid ${({ theme }) => theme.color.accent};
    background: rgba(226, 40, 60, 0.08);
  }
  .rz-marker {
    pointer-events: auto;
    position: absolute;
    top: -16px;
    left: -16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: ${({ theme }) => theme.color.accent};
    color: #fff;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 13px;
    cursor: pointer;
    box-shadow: 0 0 0 4px rgba(226, 40, 60, 0.3), 0 4px 14px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
    &:hover {
      transform: scale(1.12);
    }
    &:focus-visible {
      outline: 3px solid ${({ theme }) => theme.color.focus};
      outline-offset: 3px;
    }
  }
  .rz-region[data-active="true"] .rz-marker {
    background: #fff;
    color: ${({ theme }) => theme.color.ink};
  }
`;
const Stage = styled.div`
  position: absolute;
  inset: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  .openseadragon-canvas:focus-visible {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: -3px;
  }
`;
const Toolbar = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  top: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`;
const Zoom = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const ZoomLabel = styled.span`
  min-width: 52px;
  text-align: center;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 6px;
  background: rgba(5, 5, 5, 0.6);
`;
/**
 * 아래쪽 줄: 왼쪽에 이동 버튼, 오른쪽에 해상도 표시. 자리가 모자라면(320px 등) 표시가 버튼 위로 올라간다.
 * 넓은 화면은 미니맵이 오른쪽 아래에 있으므로 표시를 늘 버튼 위에 둔다.
 */
const Bottom = styled.div`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  pointer-events: none;
  ${media.md} {
    right: auto;
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;
const Pan = styled.div`
  display: flex;
  gap: 6px;
  pointer-events: auto;
`;
/** 아주 좁은 화면(640px 미만)에서는 짧게 쓴다. */
const Resolution = styled.div`
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(5, 5, 5, 0.7);
  .full {
    display: none;
  }
  ${media.sm} {
    .full {
      display: inline;
    }
    .short {
      display: none;
    }
  }
`;
