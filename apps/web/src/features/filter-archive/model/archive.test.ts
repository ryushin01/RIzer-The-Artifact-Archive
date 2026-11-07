import type { ArtifactSummary } from "@rizer/domain";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { describe, expect, it } from "vitest";

import { fetchArtifacts } from "@/shared/api";

import { loadArchive, syncUrl } from "./saga";
import { archiveSlice, fetchFailed, fetchSucceeded, hasActiveFilters, queryChanged, retried } from "./slice";

const item = { id: "a", slug: "excalibur", title: "엑스칼리버" } as ArtifactSummary;

describe("archive slice", () => {
  it("조건을 합치고 빈 값은 지운다", () => {
    let state = archiveSlice.reducer(undefined, queryChanged({ gallery: "norse", q: "망치" }));
    state = archiveSlice.reducer(state, queryChanged({ q: "" }));
    expect(state.query).toEqual({ sort: "featured", gallery: "norse" });
    expect(state.status).toBe("loading");
    expect(hasActiveFilters(state.query)).toBe(true);
    expect(hasActiveFilters({ sort: "featured" })).toBe(false);
  });
});

describe("loadArchive", () => {
  const state = { archive: { ...archiveSlice.getInitialState(), query: { sort: "featured" as const, gallery: "greek" as const } } };

  it("버튼 필터는 바로 불러오고 주소를 맞춘다", async () => {
    const result = await expectSaga(loadArchive, queryChanged({ gallery: "greek" }))
      .withState(state)
      .provide([
        [matchers.call.fn(fetchArtifacts), { items: [item], total: 1 }],
        [matchers.call.fn(syncUrl), undefined],
      ])
      .put(fetchSucceeded({ items: [item], total: 1 }))
      .call(syncUrl, state.archive.query)
      .run();
    // delay(ms)는 call 효과로 나타난다. 300ms를 기다리는 호출이 없어야 한다.
    expect(result.effects.call?.some((e) => e.payload.args[0] === 300)).toBe(false);
  });

  it("검색어 입력은 잠시 기다린다", () =>
    expectSaga(loadArchive, queryChanged({ q: "엑" }))
      .withState(state)
      .provide([
        [matchers.call.fn(fetchArtifacts), { items: [], total: 0 }],
        [matchers.call.fn(syncUrl), undefined],
      ])
      .delay(300)
      .run());

  it("실패하면 안내 문구를 남긴다", async () => {
    const result = await expectSaga(loadArchive, retried())
      .withState(state)
      .provide([[matchers.call.fn(fetchArtifacts), throwError(new Error("down"))]])
      .run();
    expect(result.effects.put?.[0]?.payload.action).toEqual(
      fetchFailed("유물 목록을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요."),
    );
  });
});
