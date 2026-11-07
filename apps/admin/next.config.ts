import { securityHeaders } from "@rizer/config/security-headers";
import type { NextConfig } from "next";

// 타일은 R2 공개 도메인(운영) 또는 /files(개발)에서 온다.
const tileOrigin = process.env.STORAGE_PUBLIC_URL?.startsWith("http")
  ? [new URL(process.env.STORAGE_PUBLIC_URL).origin]
  : [];
// 운영 스토리지에는 브라우저가 서명된 주소로 원본을 직접 올린다.
const uploadOrigin = process.env.S3_ENDPOINT ? [new URL(process.env.S3_ENDPOINT).origin] : [];

const headers = securityHeaders({ imgSrc: tileOrigin, connectSrc: uploadOrigin });

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  // PGlite는 자기 WASM·데이터 파일을, sharp는 네이티브 모듈을 패키지 폴더에서 읽으므로 번들하지 않는다.
  serverExternalPackages: ["@electric-sql/pglite", "sharp"],
  experimental: {
    authInterrupts: true,
    // 원본 이미지 업로드(로컬 스토리지)는 서버 액션이 아니라 Route Handler로 받지만, 폼 여유를 둔다.
    serverActions: { bodySizeLimit: "2mb" },
  },
  headers: async () => [
    { source: "/(.*)", headers },
    // 공개 API는 공개 사이트가 브라우저에서도 부른다(검색·필터).
    {
      source: "/api/public/:path*",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
      ],
    },
    // 로컬 스토리지의 타일·미리보기는 경로에 버전이 들어 있어 내용이 바뀌지 않는다.
    {
      source: "/files/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
      ],
    },
  ],
};

export default nextConfig;
