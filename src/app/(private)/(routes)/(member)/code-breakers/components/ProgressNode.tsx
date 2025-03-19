'use client'

import { Handle, type Node, type NodeProps, Position } from '@xyflow/react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from '@/components/ui/dialog'
import { ExercisesTable } from './ExercisesTable'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useDoneExerciseStore } from '../stores/useDoneExerciseStore'
import { exercises as allExercises } from '../constants/exercises'
import { nodeColors } from '../constants/colors'
import { cn } from '@/lib/utils'

type ProgressNodeType = Node<{ id: string; label: string }>

export function ProgressNode({ data }: NodeProps<ProgressNodeType>) {
  const { doneExercisesId } = useDoneExerciseStore()
  const exercises = allExercises.filter(exercise => exercise.nodeId === data.id)
  const doneExercises = exercises.filter(
    exercise => doneExercisesId?.[exercise.id]
  )
  const doneExercisesPercentage =
    (doneExercises.length / exercises.length) * 100

  return (
    <Dialog>
      <DialogTrigger>
        <button
          className={cn(
            'flex flex-col items-center gap-2 px-4 justify-center rounded-md w-56 py-4',
            nodeColors.background
          )}
        >
          <Handle
            type="target"
            position={Position.Top}
            className="bg-transparent border-0"
          />
          <p className="text-primary-foreground">{data.label}</p>
          <div
            className={cn(
              'w-full h-2 rounded-sm overflow-hidden',
              nodeColors.progress.track
            )}
          >
            <div
              style={{ width: `${doneExercisesPercentage}%` }}
              className={cn(
                'h-full transition-[width] duration-500',
                nodeColors.progress.bar
              )}
            />
          </div>
          <Handle
            type="source"
            position={Position.Bottom}
            className="bg-transparent border-0"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto min-w-full h-[100dvh] lg:min-w-fit lg:h-fit lg:w-[50rem] lg:max-w-[90vw] lg:max-h-[90vh]">
        <DialogHeader className="gap-2">
          <DialogTitle>{data.label}</DialogTitle>
          <DialogDescription>
            <div
              className={cn(
                'w-full h-2 rounded-sm overflow-hidden',
                nodeColors.progress.track
              )}
            >
              <div
                style={{ width: `${doneExercisesPercentage}%` }}
                className={cn(
                  'h-full transition-[width] duration-500',
                  nodeColors.progress.bar
                )}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <ExercisesTable exercises={exercises} />
      </DialogContent>
    </Dialog>
  )
}
