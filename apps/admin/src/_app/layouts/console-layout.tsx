import type { ReactNode } from "react";
import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@rizer/ui/components/sidebar";
import { TooltipProvider } from "@rizer/ui/components/tooltip";

import { getCurrentUser } from "@/server/auth/current-user";
import { webUrl } from "@/shared/config";
import { AppSidebar, PageHeader, UserMenu } from "@/widgets/app-shell";

async function UserFooter() {
  return <UserMenu user={await getCurrentUser()} />;
}

/** 로그인한 화면의 틀: 사이드바, 머리글, 본문 */
export function ConsoleLayout({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar
          footer={
            <Suspense fallback={null}>
              <UserFooter />
            </Suspense>
          }
        />
        <SidebarInset>
          <PageHeader siteUrl={webUrl()} />
          <div id="main" tabIndex={-1} className="flex flex-1 flex-col gap-6 p-4 outline-none md:p-6">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
