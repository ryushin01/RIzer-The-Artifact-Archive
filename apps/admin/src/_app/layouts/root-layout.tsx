import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { SidebarStateScript, SidebarWidthScript } from "@rizer/ui/components/sidebar";
import { SkipLink } from "@rizer/ui/components/skip-link";
import { Toaster } from "@rizer/ui/components/sonner";

import "../styles/globals.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "RIzer Archive 관리", template: "%s · RIzer Archive 관리" },
  description: "전설 유물 아카이브의 유물·딥줌 이미지·주석을 관리합니다.",
  robots: { index: false, follow: false },
};

export function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SkipLink />
        <SidebarWidthScript />
        {children}
        <SidebarStateScript />
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
