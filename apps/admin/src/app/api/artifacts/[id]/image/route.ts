export { uploadImageHandler as POST } from "@/server/api/upload-image";

// 큰 원본을 타일로 자르는 데 시간이 걸린다(Vercel 함수 최대 실행 시간).
export const maxDuration = 300;
