"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import appLogo from "@/assets/logo.svg";
import { Icons } from "@/components/icons";
import MobileNav from "@/components/mobile-nav";
import { RouteProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

type MainNavProps = {
  children?: React.ReactNode;
};

const MainNav = ({ children }: MainNavProps) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  const pathname = usePathname();

  const routes: RouteProps[] = [
    {
      href: `/`,
      label: "Dashboard",
      active: pathname === `/`,
    },
    {
      href: `/notes`,
      label: "Notes",
      active: pathname === `/notes`,
    },
    {
      href: `/settings/appearance`,
      label: "Settings",
      active: pathname === `/settings`,
    },
  ];

  return (
    <div className="flex gap-6 md:gap-8 items-center">
      <Link href="/" className="hidden items-center space-x-2 md:flex mr-4">
        <Image src={appLogo} alt="Logo" height={40} width={40} />
        <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
          Comunidade Sem Pátria
        </span>
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "hidden md:flex text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-primary"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <Icons.close className="h-5 w-5" />
        ) : (
          <Icons.menu className="h-5 w-5" />
        )}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && <MobileNav items={routes}>{children}</MobileNav>}
    </div>
  );
};

export default MainNav;
