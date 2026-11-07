"use client";

import { type Artifact, GALLERIES, KINDS } from "@rizer/domain";
import { Loader2, Save } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@rizer/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@rizer/ui/components/card";
import { Checkbox } from "@rizer/ui/components/checkbox";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@rizer/ui/components/field";
import { Input } from "@rizer/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@rizer/ui/components/select";
import { Textarea } from "@rizer/ui/components/textarea";

import { FormErrorAlert } from "@/shared/ui/form-error-alert";
import { usePageForm } from "@/shared/lib/use-page-form";

import { saveArtifactAction } from "../api/actions";

type Editable = Omit<Artifact, "image" | "annotationCount" | "updatedAt">;

const GALLERY_ITEMS = GALLERIES.map((g) => ({ value: g.id, label: g.label }));
const KIND_ITEMS = KINDS.map((k) => ({ value: k.id, label: k.label }));

function toDefaults(artifact?: Editable): Record<string, string> {
  if (!artifact) return { gallery: "arthurian", kind: "weapon", recordYear: "", source_institution: "The Metropolitan Museum of Art" };
  const { source, recordYear, featured, ...rest } = artifact;
  return {
    ...Object.fromEntries(Object.entries(rest).map(([k, v]) => [k, String(v ?? "")])),
    recordYear: String(recordYear),
    ...(featured ? { featured: "on" } : {}),
    ...Object.fromEntries(Object.entries(source).map(([k, v]) => [`source_${k}`, String(v ?? "")])),
  };
}

/**
 * 유물 정보 편집. 검증은 서버에서 zod 스키마 하나로 하고(noValidate), 오류는 칸 아래에 보여 준다.
 * 게스트는 읽기 전용으로 본다(readOnly). 저장 버튼은 보이지만 서버가 안내 문구로 거절한다.
 */
export function ArtifactForm({ artifact, readOnly }: { artifact?: Editable; readOnly: boolean }) {
  const form = usePageForm(saveArtifactAction, toDefaults(artifact));
  const id = (name: string) => `artifact-${name}`;

  const text = (name: string, label: string, opts: { description?: ReactNode; placeholder?: string; type?: string; className?: string } = {}) => (
    <Field data-invalid={form.invalid(name)} className={opts.className}>
      <FieldLabel htmlFor={id(name)}>{label}</FieldLabel>
      <Input
        id={id(name)}
        name={name}
        type={opts.type ?? "text"}
        defaultValue={form.text(name)}
        placeholder={opts.placeholder}
        aria-invalid={form.invalid(name)}
        readOnly={readOnly}
      />
      {opts.description && <FieldDescription>{opts.description}</FieldDescription>}
      <FieldError errors={form.errors(name)} />
    </Field>
  );

  const area = (name: string, label: string, rows: number, description?: ReactNode) => (
    <Field data-invalid={form.invalid(name)}>
      <FieldLabel htmlFor={id(name)}>{label}</FieldLabel>
      <Textarea
        id={id(name)}
        name={name}
        rows={rows}
        defaultValue={form.text(name)}
        aria-invalid={form.invalid(name)}
        readOnly={readOnly}
      />
      {description && <FieldDescription>{description}</FieldDescription>}
      <FieldError errors={form.errors(name)} />
    </Field>
  );

  const select = (name: string, label: string, items: { value: string; label: string }[]) => (
    <Field data-invalid={form.invalid(name)}>
      <FieldLabel htmlFor={id(name)}>{label}</FieldLabel>
      <Select name={name} items={items} defaultValue={form.text(name)} readOnly={readOnly}>
        <SelectTrigger id={id(name)} className="w-full" aria-invalid={form.invalid(name)}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={form.errors(name)} />
    </Field>
  );

  return (
    <form key={form.formKey} action={form.formAction} noValidate className="flex flex-col gap-6">
      {artifact && <input type="hidden" name="id" value={artifact.id} />}
      <FormErrorAlert message={form.formError} />
      {form.errorCount > 0 && !form.formError && (
        <FormErrorAlert message={`입력값 ${form.errorCount}곳을 확인해 주세요.`} />
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>기본 정보</h2>
          </CardTitle>
          <CardDescription>공개 사이트의 제목, 주소, 필터에 쓰입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            {text("title", "이름", { placeholder: "엑스칼리버" })}
            {text("titleOriginal", "원어 이름", { placeholder: "Excalibur" })}
            {text("slug", "주소", {
              placeholder: "excalibur",
              description: "공개 사이트 주소(/artifacts/주소)에 쓰입니다. 소문자, 숫자, 하이픈만 씁니다.",
            })}
            {text("recordYear", "첫 기록 연도", {
              type: "number",
              placeholder: "1136",
              description: "연표 정렬에 씁니다. 기원전은 음수로 적습니다(기원전 750년 → -750).",
            })}
            {select("gallery", "전시실", GALLERY_ITEMS)}
            {select("kind", "종류", KIND_ITEMS)}
            {text("owner", "소유자")}
            {text("maker", "만든 이")}
            {text("firstRecord", "첫 기록 문헌", { className: "md:col-span-2" })}
            {text("power", "권능", { className: "md:col-span-2", description: "전설 속 힘을 한 문장으로 적습니다." })}
            <Field orientation="horizontal" className="md:col-span-2">
              <Checkbox id={id("featured")} name="featured" defaultChecked={form.text("featured") === "on"} disabled={readOnly} />
              <FieldLabel htmlFor={id("featured")} className="font-normal">
                대표 유물로 첫 화면에 보이기
              </FieldLabel>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>해설</h2>
          </CardTitle>
          <CardDescription>문단은 빈 줄로 나눕니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {area("summary", "요약", 2, "목록 카드와 검색 결과에 보이는 한두 문장입니다.")}
            {area("story", "본문", 14)}
            {area("imageAlt", "이미지 설명(대체 텍스트)", 2, "사진에 실제로 보이는 물건을 설명합니다. 화면 낭독기가 읽습니다.")}
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <h2>이미지 출처</h2>
          </CardTitle>
          <CardDescription>
            전설 속 유물은 실물이 없으므로, 모습이 닮은 공개 도메인(CC0) 소장품 사진을 빌려 씁니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup className="grid gap-4 md:grid-cols-2">
            {text("source_institution", "소장처")}
            {text("source_objectId", "소장품 번호")}
            {text("source_objectTitle", "사진 속 소장품 이름", { className: "md:col-span-2" })}
            {text("source_objectCulture", "문화권")}
            {text("source_objectDate", "제작 시기")}
            {text("source_url", "소장품 페이지", { type: "url", className: "md:col-span-2" })}
            {text("source_imageUrl", "원본 이미지 주소", { type: "url", className: "md:col-span-2" })}
            {text("source_accessionNumber", "등록 번호")}
            {text("source_creditLine", "기증·구입 정보")}
          </FieldGroup>
        </CardContent>
      </Card>

      {/* 공개 상태는 따로 바꾼다(PublishToggle). 저장할 때는 지금 상태를 그대로 보낸다. */}
      <input type="hidden" name="status" value={artifact?.status ?? "draft"} />
      <div className="sticky bottom-0 -mx-4 flex justify-end gap-2 border-t bg-background/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <Button type="submit" disabled={form.pending}>
          {form.pending ? <Loader2 className="animate-spin" aria-hidden /> : <Save aria-hidden />}
          {artifact ? "저장" : "만들기"}
        </Button>
      </div>
    </form>
  );
}
