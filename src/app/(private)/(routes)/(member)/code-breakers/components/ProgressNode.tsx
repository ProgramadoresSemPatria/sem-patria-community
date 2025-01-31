'use client'

import { Handle, Node, NodeProps, Position } from "@xyflow/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExercisesTable } from "./ExercisesTable";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useDoneExerciseStore } from "../stores/useDoneExerciseStore";
import { exercises as allExercises } from "../constants/exercises";


type ProgressNode = Node<{ id: string; label: string }>;


export function ProgressNode({ data }: NodeProps<ProgressNode>) {
  const { doneExercisesId } = useDoneExerciseStore();
  const exercises = allExercises.filter(
    (exercise) => exercise.nodeId === data.id
  );
  const doneExercises = exercises.filter((exercise) => 
    doneExercisesId?.[exercise.id]
  );
  const doneExercisesPercentage = 
    (doneExercises.length / exercises.length) * 100;

  return (
    <Dialog>
      <DialogTrigger>
        <button className="flex flex-col items-center gap-2 px-4 justify-center rounded-md w-56 py-4 bg-[#874EF9] hover:filter">
          <Handle
            type="target"
            position={Position.Top}
            className="bg-transparent border-0"
          />
          <p className="text-white">{data.label}</p>
          <div className="w-full h-2 bg-[#EFEAFA] rounded-sm overflow-hidden">
            <div
              style={{ width: `${doneExercisesPercentage}%` }}
              className="h-full bg-[#32EEB4] transition-[width] duration-500"
            />
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            className="bg-transparent border-0"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto min-w-full h-[100dvh] lg:min-w-fit lg:h-fit lg:w-[50rem] lg:max-w-[90vw] lg:max-h-[90vh] dark:bg-[#242424]">
        <DialogHeader className="gap-2">
          <DialogTitle className="dark:text-[#F5F5F5]">
            {data.label}
          </DialogTitle>
          <DialogDescription>
            <div className="w-full h-2 bg-[#EFEAFA] dark:bg-[#efeafa4b] rounded-sm overflow-hidden">
              <div
                style={{ width: `${doneExercisesPercentage}%` }}
                className="h-full bg-[#32EEB4] transition-[width] duration-500"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <ExercisesTable exercises={exercises} />
      </DialogContent>
    </Dialog>
  );
}