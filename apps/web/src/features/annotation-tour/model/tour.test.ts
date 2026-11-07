import { expectSaga } from "redux-saga-test-plan";
import { describe, expect, it } from "vitest";

import { tourLoop } from "./saga";
import { loaded, next, paused, played, prev, selected, tourSlice, type TourState } from "./slice";

const run = (actions: Parameters<typeof tourSlice.reducer>[1][], start?: TourState) =>
  actions.reduce(tourSlice.reducer, start ?? tourSlice.getInitialState());

describe("tour slice", () => {
  it("재생하면 첫 주석부터, 끝까지 봤으면 다시 처음부터", () => {
    let s = run([loaded(["a", "b", "c"]), played()]);
    expect(s).toMatchObject({ activeId: "a", playing: true });
    s = run([selected("c"), paused(), played()], s);
    expect(s.activeId).toBe("a");
  });

  it("앞뒤로 움직이되 끝을 넘지 않는다", () => {
    const s = run([loaded(["a", "b"]), next(), next(), next()]);
    expect(s.activeId).toBe("b");
    expect(run([prev(), prev()], s).activeId).toBe("a");
  });

  it("주석이 없으면 재생하지 않는다", () => {
    expect(run([loaded([]), played()]).playing).toBe(false);
  });
});

describe("tourLoop", () => {
  it("시간이 지나면 다음 주석으로, 마지막에서 멈춘다", async () => {
    const result = await expectSaga(tourLoop)
      .withReducer(
        (state: { tour: TourState } = { tour: tourSlice.getInitialState() }, action) => ({
          tour: tourSlice.reducer(state.tour, action),
        }),
        { tour: run([loaded(["a", "b"]), played()]) },
      )
      .provide({ race: () => ({ timeout: true }) })
      .put(next())
      .put(paused())
      .run();
    expect((result.storeState as { tour: TourState }).tour).toMatchObject({ activeId: "b", playing: false });
  });

  it("사용자가 고르면 투어를 끝낸다", () =>
    expectSaga(tourLoop)
      .withState({ tour: run([loaded(["a", "b"]), played()]) })
      .provide({ race: () => ({ stop: selected("b") }) })
      .put(paused())
      .not.put(next())
      .run());
});
