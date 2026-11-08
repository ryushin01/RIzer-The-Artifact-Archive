import { securityHeaders } from "@rizer/config/security-headers";
import type { NextConfig } from "next";

const origin = (url?: string) => (url?.startsWith("http") ? [new URL(url).origin] : []);

// 공개 API(어드민)와 딥줌 타일(R2 또는 개발 중에는 어드민의 /files)에서 데이터를 받는다.
const api = origin(process.env.NEXT_PUBLIC_ARCHIVE_API_URL);
// 큐레이터가 새로 올린 이미지는 스토리지(R2·Blob)에서 온다. 시드 타일은 이 사이트의 /tiles 정적 파일이다.
// 시드 타일을 저장소 밖(R2 등)으로 옮기면 STATIC_TILES_URL에 그 주소를 둔다(어드민과 같은 값).
const tiles = [
  ...origin(process.env.STORAGE_PUBLIC_URL),
  ...origin(process.env.STATIC_TILES_URL),
  ...(process.env.STORAGE_DRIVER === "blob" ? ["https://*.public.blob.vercel-storage.com"] : []),
];
const headers = securityHeaders({ imgSrc: [...api, ...tiles], connectSrc: [...api, ...tiles] });

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  compiler: { styledComponents: true },
  headers: async () => [
    { source: "/(.*)", headers },
    // 시드 딥줌 타일: 경로에 버전이 들어 있어 내용이 바뀌지 않는다. 어드민의 주석 편집기도 읽는다.
    {
      source: "/tiles/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        { key: "Access-Control-Allow-Origin", value: "*" },
        { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
      ],
    },
  ],
  images: { unoptimized: true },
  // 공유 이미지가 읽는 한글 글꼴. process.cwd() 기준으로 읽으므로 추적 목록에 직접 넣는다.
  outputFileTracingIncludes: {
    "/artifacts/[slug]/opengraph-image": ["./node_modules/pretendard/dist/public/static/Pretendard-Bold.otf"],
  },
};

export default nextConfig;
