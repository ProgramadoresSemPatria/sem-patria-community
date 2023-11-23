import { Icons } from "@/components/icons";

export type SidebarNavItemProps = {
  title: string;
  disabled?: boolean;
  icon?: keyof typeof Icons;
  href?: string;
};
