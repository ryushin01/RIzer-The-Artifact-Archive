/** 공개 사이트 주소. 어드민에서 "공개 사이트에서 보기" 링크에 쓴다. */
export const webUrl = () => (process.env.WEB_URL || "http://localhost:3001").replace(/\/$/, "");
