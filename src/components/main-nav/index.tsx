"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import appLogo from "@/assets/logo.svg";
import { Icons } from "@/components/icons";
import MobileNav from "@/components/mobile-nav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MainNavItemProps } from "./types";

type MainNavProps = {
  items?: MainNavItemProps[];
  children?: React.ReactNode;
};

const MainNav = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image src={appLogo} alt="Logo" height={40} width={40} />
        <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-400">
          Comunidade Sem Pátria
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.darkMode />}
        <span className="font-bold">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
};

export default MainNav;
