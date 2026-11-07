import { securityHeaders } from "@rizer/config/security-headers";
import type { NextConfig } from "next";

const origin = (url?: string) => (url?.startsWith("http") ? [new URL(url).origin] : []);

// 타일은 스토리지 공개 도메인(R2·Blob, 개발은 /files)과, 시드 타일은 공개 사이트의 정적 파일에서 온다.
const tileOrigins = [
  ...origin(process.env.STORAGE_PUBLIC_URL),
  ...origin(process.env.STATIC_TILES_URL || process.env.WEB_URL),
  // Blob 공개 주소는 토큰에서 정해지므로 도메인 전체를 허용한다.
  ...(process.env.STORAGE_DRIVER === "blob" ? ["https://*.public.blob.vercel-storage.com"] : []),
];
// 운영 스토리지에는 브라우저가 서명된 주소로 원본을 직접 올린다(R2 엔드포인트 또는 Vercel Blob API).
const uploadOrigins = [
  ...origin(process.env.S3_ENDPOINT),
  ...(process.env.STORAGE_DRIVER === "blob" ? ["https://vercel.com"] : []),
];

// 주석 편집기의 PixiJS(Annotorious 번들 안)가 eval을 쓴다. 관리 화면에만 허용한다(security-headers.mjs 참고).
const headers = securityHeaders({ imgSrc: tileOrigins, connectSrc: uploadOrigins, allowEval: true });

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
