import { getArtifacts } from "@/shared/api/index.server";
import { Collection } from "@/widgets/collection";
import { Faq } from "@/widgets/faq";
import { FinalCta } from "@/widgets/final-cta";
import { Hero } from "@/widgets/hero";
import { Realms } from "@/widgets/realms";
import { Statement } from "@/widgets/statement";
import { Timeline } from "@/widgets/timeline";

/** 첫 화면: 한 장으로 이어지는 전시 소개 */
export async function HomePage() {
  const { items } = await getArtifacts();
  const featured = items.filter((a) => a.featured);
  return (
    <main id="main" tabIndex={-1}>
      <Hero featured={featured.length ? featured : items.slice(0, 5)} />
      <Statement />
      <Collection artifacts={items} />
      <Realms artifacts={items} />
      <Timeline artifacts={items} />
      <Faq />
      <FinalCta count={items.length} />
    </main>
  );
}
