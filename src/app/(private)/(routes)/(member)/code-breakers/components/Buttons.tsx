'use client'

import { useReactFlow } from '@xyflow/react'
import { exercises } from '../constants/exercises'
import { useDoneExerciseStore } from '../stores/useDoneExerciseStore'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

export function Buttons() {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const { doneExercisesId } = useDoneExerciseStore()
  const doneExercisesQty = Object.keys(doneExercisesId ?? {}).length
  const doneExercisesPercentage = (doneExercisesQty / exercises.length) * 100

  const buttonBaseClass = cn(
    'w-full min-h-12 sm:min-h-10 bg-background/95 hover:bg-background shadow-lg dark:shadow-black/40',
    'p-2 sm:p-1.5',
    'transition-all duration-200 hover:scale-105 active:scale-95',
    'border border-border/50 hover:border-border',
    'touch-manipulation select-none'
  )

  const iconBaseClass = 'size-5 sm:size-4 shrink-0'

  return (
    <div className="flex flex-col gap-4 sm:gap-3 w-14 sm:w-10">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(buttonBaseClass, 'animate-left-to-right')}
            onClick={async () => await zoomIn({ duration: 300 })}
          >
            <Icons.plus className={iconBaseClass} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="hidden sm:block"
        >
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
            <Icons.minus className={iconBaseClass} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="hidden sm:block"
        >
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
            <Icons.maximize className={iconBaseClass} />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="hidden sm:block"
        >
          Center nodes
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              buttonBaseClass,
              'animate-left-to-right rounded-md',
              'cursor-default hover:scale-100'
            )}
            style={{ animationDelay: '300ms' }}
          >
            <div className="w-full h-40 sm:h-52 ">
              <div className="relative flex items-end w-full h-full bg-primary/10 dark:bg-primary/20 rounded-sm">
                <div
                  className="absolute inset-x-0 bottom-0 rounded-sm bg-secondary transition-[height] duration-500 ease-out"
                  style={{ height: `${doneExercisesPercentage}%` }}
                />
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-xs font-medium text-foreground/80">
                    {Math.round(doneExercisesPercentage)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="hidden sm:block"
        >
          {doneExercisesQty}/{exercises.length} exercises completed
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
