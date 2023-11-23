import { Icons } from "@/components/icons";
import { MainNavItemProps } from "@/components/main-nav/types";
import { SidebarNavItemProps } from "@/components/sidebar-nav/types";

export const appConfig = {
  name: "Sem pátria - Community",
  description: "Comunidade programadores sem pátria",
};

export const mainNavItems: MainNavItemProps[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export const sidebarNavItems: SidebarNavItemProps[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
  },
];
