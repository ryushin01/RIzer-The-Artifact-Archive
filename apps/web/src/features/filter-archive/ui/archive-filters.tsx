"use client";

import { GALLERIES, KINDS, type ArtifactQuery, type GalleryId, type KindId } from "@rizer/domain";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { media } from "@/shared/config/theme";
import { IconSearch, MonoLabel } from "@/shared/ui";

import { cleared, hasActiveFilters, queryChanged, selectArchive } from "../model/slice";

const SORTS: { value: ArtifactQuery["sort"]; label: string }[] = [
  { value: "featured", label: "대표 유물 먼저" },
  { value: "oldest", label: "오래된 기록순" },
  { value: "newest", label: "최근 기록순" },
  { value: "title", label: "이름순" },
];

/**
 * 아카이브 검색·필터. 바꿀 때마다 사가가 목록을 다시 불러온다(검색어는 잠시 기다림).
 * 전시실은 라디오 버튼이라 화살표 키로 고를 수 있다.
 */
export function ArchiveFilters() {
  const dispatch = useDispatch();
  const { query, total, status } = useSelector(selectArchive);
  const id = useId();

  return (
    <Wrap role="search" aria-label="유물 검색" onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Search>
          <label htmlFor={`${id}-q`}>
            <MonoLabel>검색</MonoLabel>
          </label>
          <SearchBox>
            <IconSearch />
            <input
              id={`${id}-q`}
              type="search"
              placeholder="이름, 원어, 소유자 — 예: 토르"
              defaultValue={query.q ?? ""}
              onChange={(e) => dispatch(queryChanged({ q: e.target.value.trim() || undefined }))}
              autoComplete="off"
            />
          </SearchBox>
        </Search>
        <SelectField>
          <label htmlFor={`${id}-kind`}>
            <MonoLabel>종류</MonoLabel>
          </label>
          <select
            id={`${id}-kind`}
            value={query.kind ?? ""}
            onChange={(e) => dispatch(queryChanged({ kind: (e.target.value || undefined) as KindId | undefined }))}
          >
            <option value="">모든 종류</option>
            {KINDS.map((k) => (
              <option key={k.id} value={k.id}>
                {k.label}
              </option>
            ))}
          </select>
        </SelectField>
        <SelectField>
          <label htmlFor={`${id}-sort`}>
            <MonoLabel>정렬</MonoLabel>
          </label>
          <select
            id={`${id}-sort`}
            value={query.sort}
            onChange={(e) => dispatch(queryChanged({ sort: e.target.value as ArtifactQuery["sort"] }))}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </SelectField>
      </Row>

      <Chips>
        <legend>
          <MonoLabel>전시실</MonoLabel>
        </legend>
        <ChipList>
          {[{ id: "", label: "전체" }, ...GALLERIES].map((g) => (
            <Chip key={g.id || "all"}>
              <input
                type="radio"
                name={`${id}-gallery`}
                value={g.id}
                checked={(query.gallery ?? "") === g.id}
                onChange={() => dispatch(queryChanged({ gallery: (g.id || undefined) as GalleryId | undefined }))}
              />
              <span>{g.label}</span>
            </Chip>
          ))}
        </ChipList>
      </Chips>

      <Summary>
        <p role="status" aria-live="polite">
          {status === "loading" ? "찾는 중…" : `유물 ${total}점`}
        </p>
        {hasActiveFilters(query) && (
          <ResetButton type="button" onClick={() => dispatch(cleared())}>
            조건 지우기
          </ResetButton>
        )}
      </Summary>
    </Wrap>
  );
}

const Wrap = styled.form`
  display: grid;
  gap: 20px;
`;
const Row = styled.div`
  display: grid;
  gap: 16px;
  ${media.md} {
    grid-template-columns: 1fr 180px 180px;
    align-items: end;
  }
`;
const Search = styled.div`
  display: grid;
  gap: 8px;
`;
const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 16px;
  min-height: 52px;
  border: 1px solid ${({ theme }) => theme.color.lineStrong};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.color.surface};
  &:focus-within {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: 2px;
  }
  svg {
    width: 18px;
    color: ${({ theme }) => theme.color.muted};
  }
  input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    outline: none;
    padding: 12px 0;
  }
  input::placeholder {
    color: ${({ theme }) => theme.color.muted};
  }
`;
const SelectField = styled.div`
  display: grid;
  gap: 8px;
  select {
    min-height: 52px;
    padding: 0 14px;
    border: 1px solid ${({ theme }) => theme.color.lineStrong};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.color.surface};
    color: inherit;
    font: inherit;
  }
`;
const Chips = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 10px;
  legend {
    padding: 0;
    margin-bottom: 10px;
  }
`;
const ChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const Chip = styled.label`
  position: relative;
  input {
    position: absolute;
    inset: 0;
    opacity: 0;
    margin: 0;
    cursor: pointer;
  }
  span {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 8px 18px;
    border-radius: ${({ theme }) => theme.radius.pill};
    border: 1px solid ${({ theme }) => theme.color.lineStrong};
    font-size: 14px;
    transition: background 0.2s;
  }
  input:checked + span {
    background: ${({ theme }) => theme.color.text};
    color: ${({ theme }) => theme.color.ink};
    border-color: ${({ theme }) => theme.color.text};
  }
  input:hover + span {
    border-color: ${({ theme }) => theme.color.text};
  }
  input:focus-visible + span {
    outline: 3px solid ${({ theme }) => theme.color.focus};
    outline-offset: 2px;
  }
`;
const Summary = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 13px;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.muted};
`;
const ResetButton = styled.button`
  border: 0;
  background: none;
  padding: 8px 0;
  min-height: 44px;
  text-decoration: underline;
  text-underline-offset: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.color.text};
`;
