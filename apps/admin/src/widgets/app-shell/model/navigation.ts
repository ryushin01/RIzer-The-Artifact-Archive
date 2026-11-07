import { FileImage, LayoutDashboard, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; title: string; icon: LucideIcon };

export const NAV_ITEMS: NavItem[] = [
  { href: "/", title: "대시보드", icon: LayoutDashboard },
  { href: "/artifacts", title: "유물", icon: FileImage },
];

/** 주소에 맞는 메뉴. 하위 주소(/artifacts/123)도 상위 메뉴로 본다. */
export function findNavItem(pathname: string): NavItem | undefined {
  return [...NAV_ITEMS]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)));
}
