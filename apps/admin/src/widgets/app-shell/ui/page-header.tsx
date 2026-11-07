"use client";

import { ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@rizer/ui/components/breadcrumb";
import { Separator } from "@rizer/ui/components/separator";
import { SidebarTrigger } from "@rizer/ui/components/sidebar";

import { findNavItem } from "../model/navigation";

function CurrentPage() {
  const current = findNavItem(usePathname());
  return (
    <BreadcrumbPage className="flex items-center gap-1.5">
      {current && <current.icon className="size-4" />}
      {current?.title ?? ""}
    </BreadcrumbPage>
  );
}

export function PageHeader({ siteUrl }: { siteUrl?: string }) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4 data-vertical:self-center" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <Suspense fallback={null}>
              <CurrentPage />
            </Suspense>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {siteUrl && (
        <a
          href={siteUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-auto flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          공개 사이트
          <ExternalLink className="size-3.5" aria-hidden />
          <span className="sr-only">(새 창)</span>
        </a>
      )}
    </header>
  );
}
