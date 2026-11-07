"use client";

import "@annotorious/openseadragon/annotorious-openseadragon.css";

import type { Annotation, DeepZoomImage, Region } from "@rizer/domain";
import type { OpenSeadragonAnnotator } from "@annotorious/openseadragon";
import {
  ArrowDown,
  ArrowUp,
  Crosshair,
  Home,
  Loader2,
  PenSquare,
  Plus,
  Save,
  Trash2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type OpenSeadragon from "openseadragon";
import { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { Badge } from "@rizer/ui/components/badge";
import { Button } from "@rizer/ui/components/button";
import { Field, FieldGroup, FieldLabel } from "@rizer/ui/components/field";
import { Input } from "@rizer/ui/components/input";
import { Textarea } from "@rizer/ui/components/textarea";

import { saveAnnotationsAction } from "../api/actions";
import { pixelsToRegion, regionFromViewport, toAnnotoriousShape, type PixelRect } from "../model/region";

type Item = { id: string; title: string; body: string; region: Region };

type Shape = { id: string; target: { selector: { geometry: PixelRect } } };

let counter = 0;
const tempId = () => `new_${Date.now().toString(36)}_${counter++}`;

/**
 * 딥줌 이미지 위에 사각형 주석을 그리고 설명을 단다.
 * - 마우스: "영역 그리기"를 켜고 끌어서 그린다. 그린 영역은 모서리를 끌어 고친다.
 * - 키보드: 뷰어에서 화살표·+/-로 움직인 뒤 "보이는 영역으로 추가"를 누르고, 목록에서 x·y·너비·높이를 숫자로 고친다.
 * 저장은 목록 전체를 한 번에 보낸다.
 */
export function AnnotationEditor({
  artifactId,
  image,
  imageAlt,
  initial,
  readOnly,
}: {
  artifactId: string;
  image: DeepZoomImage;
  imageAlt: string;
  initial: Annotation[];
  readOnly: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<OpenSeadragon.Viewer | null>(null);
  const annoRef = useRef<OpenSeadragonAnnotator | null>(null);
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<Item[]>(() =>
    initial.map((a) => ({ id: a.id, title: a.title, body: a.body, region: a.region })),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saving, startSaving] = useTransition();
  const size = { width: image.width, height: image.height };

  // 뷰어와 Annotorious는 브라우저에서만 돈다. 한 번 만들고 화면을 떠날 때 정리한다.
  useEffect(() => {
    let disposed = false;
    const sizeAtMount = { width: image.width, height: image.height };
    (async () => {
      const [{ default: OSD }, { createOSDAnnotator, UserSelectAction }] = await Promise.all([
        import("openseadragon"),
        import("@annotorious/openseadragon"),
      ]);
      if (disposed || !containerRef.current) return;
      const viewer = OSD({
        element: containerRef.current,
        tileSources: image.dziUrl,
        crossOriginPolicy: "Anonymous",
        showNavigationControl: false,
        gestureSettingsMouse: { clickToZoom: false },
        maxZoomPixelRatio: 2,
        visibilityRatio: 0.5,
      });
      const anno = createOSDAnnotator(viewer, {
        drawingEnabled: false,
        userSelectAction: readOnly ? UserSelectAction.SELECT : UserSelectAction.EDIT,
        style: { fill: "#e11d48", fillOpacity: 0.15, stroke: "#e11d48", strokeWidth: 2 },
      });
      anno.setDrawingTool("rectangle");
      anno.setAnnotations(
        initial.map((a) => toAnnotoriousShape(a.id, a.region, sizeAtMount)) as never,
        true,
      );
      anno.on("createAnnotation", (created) => {
        const shape = created as unknown as Shape;
        const region = pixelsToRegion(shape.target.selector.geometry, sizeAtMount);
        setItems((list) => [...list, { id: shape.id, title: `새 주석 ${list.length + 1}`, body: "", region }]);
        setSelected(shape.id);
        setDirty(true);
      });
      anno.on("updateAnnotation", (updated) => {
        const shape = updated as unknown as Shape;
        const region = pixelsToRegion(shape.target.selector.geometry, sizeAtMount);
        setItems((list) => list.map((i) => (i.id === shape.id ? { ...i, region } : i)));
        setDirty(true);
      });
      anno.on("selectionChanged", (selection) => {
        setSelected((selection[0] as unknown as Shape | undefined)?.id ?? null);
      });
      viewerRef.current = viewer;
      annoRef.current = anno;
      setReady(true);
    })();
    return () => {
      disposed = true;
      annoRef.current?.destroy();
      viewerRef.current?.destroy();
      annoRef.current = null;
      viewerRef.current = null;
    };
    // 이미지가 바뀌면(새로 올림) 다시 만든다. 주석 목록은 처음 값만 쓴다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image.dziUrl]);

  // 저장하지 않은 변경이 있으면 화면을 떠나기 전에 묻는다.
  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);

  const toggleDrawing = () => {
    const next = !drawing;
    annoRef.current?.setDrawingEnabled(next);
    setDrawing(next);
  };

  const focusItem = (id: string) => {
    setSelected(id);
    annoRef.current?.setSelected(id, !readOnly);
    annoRef.current?.fitBounds({ id }, { padding: 40 } as never);
  };

  const addFromViewport = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const rect = viewer.viewport.viewportToImageRectangle(viewer.viewport.getBounds());
    const region = regionFromViewport({ x: rect.x, y: rect.y, w: rect.width, h: rect.height }, size);
    const id = tempId();
    annoRef.current?.addAnnotation(toAnnotoriousShape(id, region, size) as never);
    setItems((list) => [...list, { id, title: `새 주석 ${list.length + 1}`, body: "", region }]);
    setSelected(id);
    setDirty(true);
  };

  const update = (id: string, patch: Partial<Item>) => {
    setItems((list) => list.map((i) => (i.id === id ? { ...i, ...patch } : i)));
    if (patch.region) annoRef.current?.updateAnnotation(toAnnotoriousShape(id, patch.region, size) as never);
    setDirty(true);
  };

  const remove = (id: string) => {
    annoRef.current?.removeAnnotation(id);
    setItems((list) => list.filter((i) => i.id !== id));
    if (selected === id) setSelected(null);
    setDirty(true);
  };

  const move = (index: number, delta: -1 | 1) => {
    setItems((list) => {
      const next = [...list];
      const [item] = next.splice(index, 1);
      next.splice(index + delta, 0, item!);
      return next;
    });
    setDirty(true);
  };

  const saveLock = useRef(false);
  const save = () => {
    if (saveLock.current) return;
    saveLock.current = true;
    startSaving(async () => {
      const payload = items.map((i, order) => ({
        id: i.id.startsWith("ann_") ? i.id : undefined,
        title: i.title,
        body: i.body,
        region: i.region,
        order,
      }));
      try {
        const result = await saveAnnotationsAction(artifactId, payload);
        if (result.ok) {
          toast.success(result.message);
          setDirty(false);
        } else toast.error(result.message);
      } finally {
        saveLock.current = false;
      }
    });
  };

  const zoom = (factor: number) => viewerRef.current?.viewport.zoomBy(factor).applyConstraints();

  const regionField = (item: Item, key: keyof Region, label: string) => (
    <Field>
      <FieldLabel htmlFor={`${item.id}-${key}`} className="text-xs">
        {label}(%)
      </FieldLabel>
      <Input
        id={`${item.id}-${key}`}
        type="number"
        inputMode="decimal"
        min={0}
        max={100}
        step={0.1}
        value={item.region[key]}
        readOnly={readOnly}
        onChange={(e) => {
          const value = Number(e.target.value);
          if (Number.isFinite(value)) update(item.id, { region: { ...item.region, [key]: value } });
        }}
      />
    </Field>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section aria-label="이미지와 주석 영역" className="flex min-w-0 flex-col gap-2">
        <div role="toolbar" aria-label="뷰어 도구" className="flex flex-wrap items-center gap-2">
          {!readOnly && (
            <>
              <Button type="button" variant={drawing ? "default" : "outline"} size="sm" onClick={toggleDrawing} aria-pressed={drawing} disabled={!ready}>
                <PenSquare aria-hidden />
                영역 그리기
              </Button>
              <Button type="button" variant="outline" size="sm" onClick={addFromViewport} disabled={!ready}>
                <Crosshair aria-hidden />
                보이는 영역으로 추가
              </Button>
            </>
          )}
          <div className="ml-auto flex gap-1">
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => zoom(1.5)} aria-label="확대" disabled={!ready}>
              <ZoomIn aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => zoom(1 / 1.5)} aria-label="축소" disabled={!ready}>
              <ZoomOut aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" onClick={() => viewerRef.current?.viewport.goHome()} aria-label="전체 보기" disabled={!ready}>
              <Home aria-hidden />
            </Button>
          </div>
        </div>
        <div
          ref={containerRef}
          role="img"
          aria-label={imageAlt}
          className="relative h-[60vh] min-h-80 overflow-hidden rounded-lg border bg-neutral-900 lg:h-[calc(100vh-14rem)]"
          style={{ backgroundColor: image.dominantColor }}
        />
        <p className="text-xs text-muted-foreground">
          {drawing ? "이미지 위를 끌어 사각형을 그립니다. 다 그렸으면 '영역 그리기'를 다시 눌러 끕니다." : "끌어서 움직이고, 휠이나 두 손가락으로 확대합니다."}
        </p>
      </section>

      <section aria-labelledby="annotation-list-title" className="flex min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h2 id="annotation-list-title" className="font-semibold">
            주석 <Badge variant="secondary">{items.length}</Badge>
          </h2>
          {!readOnly && (
            <Button type="button" onClick={save} disabled={saving || !dirty}>
              {saving ? <Loader2 className="animate-spin" aria-hidden /> : <Save aria-hidden />}
              {dirty ? "저장" : "저장됨"}
            </Button>
          )}
        </div>
        {items.length === 0 && (
          <p className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            아직 주석이 없습니다.{!readOnly && " 이미지에 영역을 그리거나 '보이는 영역으로 추가'를 눌러 시작하세요."}
          </p>
        )}
        <ol className="flex flex-col gap-2">
          {items.map((item, index) => {
            const open = selected === item.id;
            return (
              <li key={item.id} className={`rounded-lg border p-3 ${open ? "border-primary ring-2 ring-primary/20" : ""}`}>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-auto flex-1 justify-start px-1 text-left font-medium whitespace-normal"
                    onClick={() => focusItem(item.id)}
                    aria-expanded={open}
                    aria-controls={`${item.id}-panel`}
                  >
                    <span className="mr-1 text-muted-foreground tabular-nums">{index + 1}.</span>
                    {item.title || "(제목 없음)"}
                  </Button>
                  {!readOnly && (
                    <div className="flex shrink-0">
                      <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`${index + 1}번 주석을 위로`}>
                        <ArrowUp aria-hidden />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={`${index + 1}번 주석을 아래로`}>
                        <ArrowDown aria-hidden />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm" onClick={() => remove(item.id)} aria-label={`${index + 1}번 주석 삭제`}>
                        <Trash2 aria-hidden />
                      </Button>
                    </div>
                  )}
                </div>
                <div id={`${item.id}-panel`} hidden={!open} className="mt-2">
                  <FieldGroup className="gap-3">
                    <Field>
                      <FieldLabel htmlFor={`${item.id}-title`}>제목</FieldLabel>
                      <Input id={`${item.id}-title`} value={item.title} readOnly={readOnly} maxLength={80} onChange={(e) => update(item.id, { title: e.target.value })} />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor={`${item.id}-body`}>설명</FieldLabel>
                      <Textarea id={`${item.id}-body`} value={item.body} readOnly={readOnly} rows={4} maxLength={1200} onChange={(e) => update(item.id, { body: e.target.value })} />
                    </Field>
                    <fieldset className="grid grid-cols-4 gap-2">
                      <legend className="mb-1 text-xs text-muted-foreground">영역(이미지 크기에 대한 백분율)</legend>
                      {regionField(item, "x", "왼쪽")}
                      {regionField(item, "y", "위")}
                      {regionField(item, "w", "너비")}
                      {regionField(item, "h", "높이")}
                    </fieldset>
                  </FieldGroup>
                </div>
              </li>
            );
          })}
        </ol>
        {!readOnly && items.length > 0 && (
          <Button type="button" variant="outline" onClick={addFromViewport} disabled={!ready} className="self-start">
            <Plus aria-hidden />
            주석 추가
          </Button>
        )}
      </section>
    </div>
  );
}
