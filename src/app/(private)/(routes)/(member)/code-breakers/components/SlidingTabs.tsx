import { type Edge, type Node } from "@xyflow/react";
import clsx from "clsx";
import { useRef, useState } from "react";
import { courseEdges } from "../constants/courseEdges";
import { courseNodes } from "../constants/courseNodes";
import { progressEdges } from "../constants/progressEdges";
import { progressNodes } from "../constants/progressNodes";
import { courseNodeSize, progressNodeSize } from "../constants/nodeSizes";

interface SlidingTabBarProps {
  onLayout: (
    nodes: Node[],
    edges: Edge[],
    size: { width: number; height: number }
  ) => void;
}

const allTabs = [
  { id: "algorithms", name: "Algorithms" },
  { id: "courses", name: "Courses" },
];

export function SlidingTabBar({ onLayout }: SlidingTabBarProps) {
  'use client'
  
  const tabsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(108);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(4);

  const setTabPosition = (index: number) => {
    const tab = tabsRef.current[index];
    setTabUnderlineLeft(tab?.offsetLeft ?? 0);
    setTabUnderlineWidth(tab?.clientWidth ?? 0);
  };

  const handleTabChange = (index: number) => {
    if (index === activeTabIndex) return;
    setActiveTabIndex(index);
    setTabPosition(index);
    onLayout(
      index === 0 ? progressNodes : courseNodes,
      index === 0 ? progressEdges : courseEdges,
      index === 0 ? progressNodeSize : courseNodeSize
    );
  };

  return (
    <div
      className="animate-from-bottom relative mx-auto flex h-10 rounded-[0.25rem] border dark:border-white/20 bg-white dark:bg-neutral-800 px-1 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.25)] transition-all duration-300"
      style={{ animationDelay: "0.3s" }}
    >
      <span
        className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-sm py-1 transition-all duration-300"
        style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
      >
        <span className="h-full w-full rounded-sm bg-[#874ef9]" />
      </span>
      {allTabs.map((tab, index) => (
        <button
          key={index}
          ref={(el) => (tabsRef.current[index] = el)}
          className={clsx(
            "my-auto cursor-pointer select-none rounded-full px-4 text-center dark:text-white text-sm transition-all duration-300",
            activeTabIndex === index && "text-white"
          )}
          onClick={() => handleTabChange(index)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
}