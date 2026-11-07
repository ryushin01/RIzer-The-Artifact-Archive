/** 어드민 공개 API 주소. 서버는 ARCHIVE_API_URL, 브라우저는 NEXT_PUBLIC_ARCHIVE_API_URL을 쓴다. */
export function apiBase(): string {
  const url = typeof window === "undefined" ? process.env.ARCHIVE_API_URL : process.env.NEXT_PUBLIC_ARCHIVE_API_URL;
  return (url || process.env.NEXT_PUBLIC_ARCHIVE_API_URL || "http://localhost:3000").replace(/\/$/, "");
}

/** 이 사이트의 바깥 주소(사이트맵·메타데이터) */
export const siteUrl = () => (process.env.SITE_URL || "http://localhost:3001").replace(/\/$/, "");
