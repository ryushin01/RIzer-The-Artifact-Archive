"use client";

import { Landmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, Suspense } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@rizer/ui/components/sidebar";

import { findNavItem, NAV_ITEMS } from "../model/navigation";

/**
 * 사이드바 틀. 사용자에 따라 달라지는 계정 영역은 서버에서 Suspense로 감싸 슬롯으로 넣는다.
 * 틀 자체를 Suspense 안에 두면 모바일에서 하이드레이션이 어긋나므로 밖에 둔다.
 */
export function AppSidebar({ footer }: { footer: ReactNode }) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Landmark className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Rizer Archive</span>
                <span className="truncate text-xs text-muted-foreground">전설 유물 관리</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>메뉴</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* 현재 주소는 요청 때만 알 수 있으므로, 활성 표시가 없는 메뉴를 먼저 그린다. */}
            <Suspense fallback={<NavMenu active={undefined} />}>
              <ActiveNavMenu />
            </Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{footer}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function ActiveNavMenu() {
  return <NavMenu active={findNavItem(usePathname())?.href} />;
}

function NavMenu({ active }: { active: string | undefined }) {
  return (
    <SidebarMenu>
      {NAV_ITEMS.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton
            isActive={active === item.href}
            tooltip={item.title}
            render={<Link href={item.href} aria-current={active === item.href ? "page" : undefined} />}
          >
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
