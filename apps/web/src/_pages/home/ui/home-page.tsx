import { Suspense } from "react";

import { getArtifacts } from "@/shared/api/index.server";
import { Collection } from "@/widgets/collection";
import { Faq } from "@/widgets/faq";
import { FinalCta } from "@/widgets/final-cta";
import { Hero } from "@/widgets/hero";
import { Realms } from "@/widgets/realms";
import { Statement } from "@/widgets/statement";
import { Timeline } from "@/widgets/timeline";

/**
 * 유물 목록이 필요한 부분. 평소에는 오래 캐시해 정적 화면에 들어가고,
 * 공개 API에 닿지 못하면(빌드 중 어드민이 꺼져 있음 등) 짧게만 캐시하므로 요청 때 채운다(Suspense).
 */
async function Exhibition() {
  const { items } = await getArtifacts();
  const featured = items.filter((a) => a.featured);
  return (
    <>
      <Hero featured={featured.length ? featured : items.slice(0, 5)} />
      <Statement />
      <Collection artifacts={items} />
      <Realms artifacts={items} />
      <Timeline artifacts={items} />
      <Faq />
      <FinalCta count={items.length} />
    </>
  );
}

/** 첫 화면: 한 장으로 이어지는 전시 소개 */
export function HomePage() {
  return (
    <main id="main" tabIndex={-1}>
      <Suspense fallback={<div style={{ minHeight: "100svh" }} aria-busy="true" />}>
        <Exhibition />
      </Suspense>
    </main>
  );
}
