import type { Locale } from "@rizer/domain";
import type { Metadata, Viewport } from "next";
import { Space_Mono, Unbounded } from "next/font/google";
import { type ReactNode, Suspense } from "react";

import { siteUrl } from "@/shared/config";
import { LocaleProvider, MESSAGES } from "@/shared/i18n";

// 한글 본문 글꼴. 유니코드 범위별로 나뉜 파일이라 화면에 쓰인 글자의 파일만 내려받는다(자체 호스팅).
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import { SiteFooter } from "@/widgets/site-footer";

import { StoreProvider } from "../model/store-provider";
import { StyledRegistry } from "../styles/style-registry";
import { ClientChrome } from "./client-chrome";
import { SkipLink } from "./skip-link";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700", "800"] });
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400", "700"] });

function metadataOf(locale: Locale): Metadata {
  const t = MESSAGES[locale].meta;
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.title, template: "%s · RIzer Archive" },
    description: t.description,
    openGraph: { siteName: "RIzer Archive", locale: t.ogLocale, type: "website" },
    alternates: { languages: { ko: "/", en: "/en" } },
  };
}

export const metadata = metadataOf("ko");
export const metadataEn = metadataOf("en");

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark" };

/**
 * 그리기 전에 실행하는 작은 스크립트: 이번 탭에서 입장 화면을 지났는지, 움직임 설정이 무엇인지 html에 표시해
 * 첫 화면이 깜박이지 않게 한다. 저장소를 못 쓰면 조용히 넘어간다.
 */
const PRE_PAINT = `try{var d=document.documentElement;if(sessionStorage.getItem("rizer:gate")==="1")d.dataset.gate="seen";var m=localStorage.getItem("rizer:motion");var r=m==="reduce"||(m!=="full"&&matchMedia("(prefers-reduced-motion: reduce)").matches);d.dataset.motion=r?"reduce":"full"}catch(e){}`;

export function RootLayout({ children, locale = "ko" }: { children: ReactNode; locale?: Locale }) {
  return (
    <html lang={locale} className={`${display.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: PRE_PAINT }} />
        <noscript>
          <style>{"[data-gate]{display:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <StyledRegistry>
          <LocaleProvider locale={locale}>
          <StoreProvider>
            <SkipLink />
            <div id="page">
              {children}
              <SiteFooter adminUrl={process.env.NEXT_PUBLIC_ARCHIVE_API_URL ? `${process.env.NEXT_PUBLIC_ARCHIVE_API_URL}/login` : undefined} />
            </div>
            <Suspense fallback={null}>
              <ClientChrome />
            </Suspense>
          </StoreProvider>
          </LocaleProvider>
        </StyledRegistry>
      </body>
    </html>
  );
}

export const RootLayoutEn = ({ children }: { children: ReactNode }) => <RootLayout locale="en">{children}</RootLayout>;
