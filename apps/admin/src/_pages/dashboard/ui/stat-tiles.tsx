import { Card, CardDescription, CardHeader, CardTitle } from "@rizer/ui/components/card";

type Stats = { total: number; published: number; draft: number; withImage: number; annotations: number };

/** 숫자 하나씩 보여 주는 요약 칸 */
export function StatTiles({ stats }: { stats: Stats }) {
  const tiles = [
    { label: "전체 유물", value: stats.total, unit: "점" },
    { label: "공개", value: stats.published, unit: "점" },
    { label: "딥줌 이미지", value: stats.withImage, unit: "점", note: `${stats.total - stats.withImage}점 없음` },
    { label: "주석", value: stats.annotations, unit: "개" },
  ];
  return (
    <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tiles.map((t) => (
        <li key={t.label}>
          <Card>
            <CardHeader>
              <CardDescription>{t.label}</CardDescription>
              <CardTitle className="text-3xl tabular-nums">
                {t.value.toLocaleString("ko-KR")}
                <span className="ml-1 text-base font-normal text-muted-foreground">{t.unit}</span>
              </CardTitle>
              {t.note && <p className="text-xs text-muted-foreground">{t.note}</p>}
            </CardHeader>
          </Card>
        </li>
      ))}
    </ul>
  );
}
