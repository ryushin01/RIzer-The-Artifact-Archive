"use client";

import { GALLERIES } from "@rizer/domain";
import { Search } from "lucide-react";

import { Button } from "@rizer/ui/components/button";
import { Field, FieldLabel } from "@rizer/ui/components/field";
import { Input } from "@rizer/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@rizer/ui/components/select";

const ALL = "all";
const GALLERY_ITEMS = [{ value: ALL, label: "모든 전시실" }, ...GALLERIES.map((g) => ({ value: g.id, label: g.label }))];
const STATUS_ITEMS = [
  { value: ALL, label: "모든 상태" },
  { value: "published", label: "공개" },
  { value: "draft", label: "비공개" },
];

/** 목록 검색. 주소 쿼리로 보내는 GET 폼이라 스크립트 없이도 동작하고, 검색 결과 주소를 공유할 수 있다. */
export function ArtifactFilters({ q, gallery, status }: { q?: string; gallery?: string; status?: string }) {
  return (
    <form method="get" role="search" aria-label="유물 검색" className="flex flex-wrap items-end gap-3">
      <Field className="w-full sm:w-64">
        <FieldLabel htmlFor="filter-q">검색어</FieldLabel>
        <Input id="filter-q" name="q" type="search" defaultValue={q} placeholder="이름, 원어, 소유자" />
      </Field>
      <Field className="w-full sm:w-48">
        <FieldLabel htmlFor="filter-gallery">전시실</FieldLabel>
        <Select name="gallery" items={GALLERY_ITEMS} defaultValue={gallery ?? ALL}>
          <SelectTrigger id="filter-gallery" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GALLERY_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field className="w-full sm:w-36">
        <FieldLabel htmlFor="filter-status">상태</FieldLabel>
        <Select name="status" items={STATUS_ITEMS} defaultValue={status ?? ALL}>
          <SelectTrigger id="filter-status" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Button type="submit" variant="secondary">
        <Search aria-hidden />
        검색
      </Button>
    </form>
  );
}
