'use client'

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
  } from "@/components/ui/tooltip";
  import { type ReactNode } from "react";
  
  interface TooltipWrapperProps {
    children: ReactNode;
    tooltipContent: ReactNode;
    animationDelay?: number;
    onClick?: () => void;
  }
  
  export function ButtonTooltipWrapper({
    children,
    tooltipContent,
    animationDelay = 0,
    onClick,
  }: TooltipWrapperProps) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <button
            style={{ animationDelay: `${animationDelay}ms` }}
            className="animate-left-to-right flex justify-center items-center w-full min-h-10 rounded-[0.25rem] bg-white dark:bg-[#2c2c2c] dark:shadow-[0_0_50px_rgba(0,0,0,1)] shadow-[0_0_50px_rgba(0,0,0,0.25)]"
            onClick={(e) => {
              e.preventDefault();
              if (!onClick) return;
              onClick();
            }}
          >
            {children}
          </button>
        </TooltipTrigger>
        <TooltipContent
          sideOffset={8}
          side="right"
          onPointerDownOutside={(e) => {
            e.preventDefault();
          }}
        >
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    );
  }