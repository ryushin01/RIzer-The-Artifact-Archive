import { securityHeaders } from "@rizer/config/security-headers";
import type { NextConfig } from "next";

const origin = (url?: string) => (url?.startsWith("http") ? [new URL(url).origin] : []);

// 공개 API(어드민)와 딥줌 타일(R2 또는 개발 중에는 어드민의 /files)에서 데이터를 받는다.
const api = origin(process.env.NEXT_PUBLIC_ARCHIVE_API_URL);
const tiles = origin(process.env.STORAGE_PUBLIC_URL);
const headers = securityHeaders({ imgSrc: [...api, ...tiles], connectSrc: [...api, ...tiles] });

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactCompiler: true,
  cacheComponents: true,
  compiler: { styledComponents: true },
  headers: async () => [{ source: "/(.*)", headers }],
  images: { unoptimized: true },
};

export default nextConfig;
