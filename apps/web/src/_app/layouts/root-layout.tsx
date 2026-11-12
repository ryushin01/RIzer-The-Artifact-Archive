import type { Locale } from "@rizer/domain";
import type { Metadata, Viewport } from "next";
import {
  Nanum_Gothic_Coding,
  Nanum_Myeongjo,
  Song_Myung,
  UnifrakturCook,
} from "next/font/google";
import { type ReactNode, Suspense } from "react";

import { siteUrl } from "@/shared/config";
import { LocaleProvider, MESSAGES } from "@/shared/i18n";

import { SiteFooter } from "@/widgets/site-footer";

import { StoreProvider } from "../model/store-provider";
import { StyledRegistry } from "../styles/style-registry";
import { ClientChrome } from "./client-chrome";
import { SkipLink } from "./skip-link";

// 유물 이름은 중세 필사본 같은 블랙레터(영문)와 붓맛이 있는 송명(한글), 해설은 나눔명조, 소장 번호는 나눔고딕코딩.
// 한글 글꼴은 글자 묶음별 조각 파일이라 미리 받지 않고(preload: false) 화면에 쓰인 조각만 받는다(자체 호스팅).
const display = UnifrakturCook({
  subsets: ["latin"],
  variable: "--font-display-en",
  weight: "700",
});
const displayKo = Song_Myung({ variable: "--font-display-ko", weight: "400" });
const body = Nanum_Myeongjo({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "700", "800"],
  preload: false,
});
const mono = Nanum_Gothic_Coding({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  preload: false,
});

function metadataOf(locale: Locale): Metadata {
  const t = MESSAGES[locale].meta;
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: t.title, template: "%s · Rizer Archive" },
    description: t.description,
    openGraph: {
      siteName: "Rizer Archive",
      locale: t.ogLocale,
      type: "website",
    },
    alternates: { languages: { ko: "/", en: "/en" } },
  };
}

export const metadata = metadataOf("ko");
export const metadataEn = metadataOf("en");

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
};

/**
 * 그리기 전에 실행하는 작은 스크립트: 이번 탭에서 입장 화면을 지났는지, 움직임 설정이 무엇인지 html에 표시해
 * 첫 화면이 깜박이지 않게 한다. 저장소를 못 쓰면 조용히 넘어간다.
 */
const PRE_PAINT = `try{var d=document.documentElement;if(sessionStorage.getItem("rizer:gate")==="1")d.dataset.gate="seen";var m=localStorage.getItem("rizer:motion");var r=m==="reduce"||(m!=="full"&&matchMedia("(prefers-reduced-motion: reduce)").matches);d.dataset.motion=r?"reduce":"full"}catch(e){}`;

export function RootLayout({
  children,
  locale = "ko",
}: {
  children: ReactNode;
  locale?: Locale;
}) {
  return (
    <html
      lang={locale}
      className={`${display.variable} ${displayKo.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
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
                <SiteFooter
                  adminUrl={
                    process.env.NEXT_PUBLIC_ARCHIVE_API_URL
                      ? `${process.env.NEXT_PUBLIC_ARCHIVE_API_URL}/login`
                      : undefined
                  }
                />
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

export const RootLayoutEn = ({ children }: { children: ReactNode }) => (
  <RootLayout locale="en">{children}</RootLayout>
);
