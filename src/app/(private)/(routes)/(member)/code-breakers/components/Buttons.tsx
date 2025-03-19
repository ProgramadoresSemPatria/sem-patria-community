'use client'

import { useReactFlow } from '@xyflow/react'
import { exercises } from '../constants/exercises'
import { useDoneExerciseStore } from '../stores/useDoneExerciseStore'
import { Maximize, Minus, Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Buttons() {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const { doneExercisesId } = useDoneExerciseStore()
  const doneExercisesQty = Object.keys(doneExercisesId ?? {}).length
  const doneExercisesPercentage = (doneExercisesQty / exercises.length) * 100

  const buttonBaseClass =
    'w-full min-h-10 bg-background hover:bg-background/90 shadow-lg dark:shadow-black/40'

  return (
    <div className="flex flex-col gap-3 w-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(buttonBaseClass, 'animate-left-to-right')}
            onClick={async () => await zoomIn({ duration: 300 })}
          >
            <Plus className="size-4 shrink-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Zoom in
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(buttonBaseClass, 'animate-left-to-right')}
            style={{ animationDelay: '100ms' }}
            onClick={async () => await zoomOut({ duration: 300 })}
          >
            <Minus className="size-4 shrink-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Zoom out
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(buttonBaseClass, 'animate-left-to-right')}
            style={{ animationDelay: '200ms' }}
            onClick={async () => await fitView({ duration: 1000 })}
          >
            <Maximize className="size-4 shrink-0" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          Center nodes
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonBaseClass,
              'animate-left-to-right rounded-md border',
              'cursor-default'
            )}
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-full h-52 p-1">
              <div className="flex items-end w-full h-full bg-primary/10 dark:bg-primary/20 rounded-sm">
                <div
                  className="w-full rounded-sm bg-secondary transition-[height] duration-500"
                  style={{ height: `${doneExercisesPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {doneExercisesQty}/{exercises.length}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
