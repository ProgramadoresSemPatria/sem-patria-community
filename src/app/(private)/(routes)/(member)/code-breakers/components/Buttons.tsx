'use client'

import { useReactFlow } from "@xyflow/react";
import { exercises } from "../constants/exercises";
import { useDoneExerciseStore } from "../stores/useDoneExerciseStore";
import { Maximize, Minus, Plus } from "lucide-react";
import { ButtonTooltipWrapper } from "./ButtonTooltipWrapper";

export function Buttons() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const { doneExercisesId } = useDoneExerciseStore();
  const doneExercisesQty = Object.keys(doneExercisesId ?? {}).length;
  const doneExercisesPercentage = (doneExercisesQty / exercises.length) * 100;

  return (
    <div className="flex flex-col gap-3 w-10">
      <ButtonTooltipWrapper
        tooltipContent={"Zoom in"}
        onClick={() => zoomIn({ duration: 300 })}
      >
        <Plus className="size-4 dark:text-white" />
      </ButtonTooltipWrapper>

      <ButtonTooltipWrapper
        animationDelay={100}
        tooltipContent={"Zoom out"}
        onClick={() => zoomOut({ duration: 300 })}
      >
        <Minus className="size-4 dark:text-white" />
      </ButtonTooltipWrapper>

      <ButtonTooltipWrapper
        animationDelay={200}
        tooltipContent={"Center nodes"}
        onClick={() => fitView({ duration: 1000 })}
      >
        <Maximize className="size-4 dark:text-white" />
      </ButtonTooltipWrapper>

      <ButtonTooltipWrapper
        animationDelay={300}
        tooltipContent={`${doneExercisesQty}/${exercises.length}`}
      >
        <div className="w-full h-52 rounded-[0.25rem] bg-white dark:bg-[#2c2c2c] shadow-[0_0_50px_rgba(0,0,0,0.25)] p-1 cursor-default">
          <div className="flex items-end w-full h-full bg-[#5316cc1a] dark:bg-[#503f70] rounded-sm">
            <div
              className="w-full rounded-sm bg-[#32EEB4] transition-[height] duration-500"
              style={{ height: `${doneExercisesPercentage}%` }}
            />
          </div>
        </div>
      </ButtonTooltipWrapper>
    </div>
  );
}