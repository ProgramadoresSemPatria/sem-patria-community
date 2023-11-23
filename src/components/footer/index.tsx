import * as React from "react";

import appLogo from "@/assets/logo.svg";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Footer = ({ className }: React.HTMLAttributes<HTMLElement>) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src={appLogo} alt="Logo" height={40} width={40} />
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; Bordeless community. All rights reserved. {currentYear}
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
};

export default Footer;
