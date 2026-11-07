import { formatYear } from "@rizer/domain";

/** 연표 표시용: "기원전 750년경", "1136년" */
export const recordYearLabel = (year: number) => (year < 0 ? `${formatYear(year)}경` : formatYear(year));

/** 두 자리 번호: 1 → "01" */
export const pad2 = (n: number) => String(n).padStart(2, "0");
