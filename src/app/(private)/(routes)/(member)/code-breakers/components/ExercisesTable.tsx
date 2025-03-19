'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { ExternalLink, MonitorPlay } from 'lucide-react'
import type { IExercise } from '../types/IExercise'
import { useDoneExerciseStore } from '../stores/useDoneExerciseStore'
import { Checkbox } from '@/components/ui/checkbox'
import { difficultyColors } from '../constants/colors'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface ExercisesTableProps {
  exercises: IExercise[]
}

export function ExercisesTable({ exercises }: ExercisesTableProps) {
  const { doneExercisesId } = useDoneExerciseStore()

  const changeStatus = (exerciseId: string) => {
    const isExerciseDone = doneExercisesId?.[exerciseId] || false
    if (!isExerciseDone) {
      markExerciseAsDone(exerciseId)
      return
    }
    markExerciseAsUndone(exerciseId)
  }

  const markExerciseAsDone = (exerciseId: string) => {
    useDoneExerciseStore.setState({
      doneExercisesId: {
        ...doneExercisesId,
        [exerciseId]: true
      }
    })
  }

  const markExerciseAsUndone = (exerciseId: string) => {
    const filteredExercises = doneExercisesId
    delete filteredExercises?.[exerciseId]
    useDoneExerciseStore.setState({
      doneExercisesId: filteredExercises
    })
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-xs sm:text-sm lg:text-base">
              Status
            </TableHead>
            <TableHead className="text-xs sm:text-sm lg:text-base">
              Problem
            </TableHead>
            <TableHead className="hidden md:table-cell text-xs sm:text-sm lg:text-base">
              Difficulty
            </TableHead>
            <TableHead className="w-[50px] text-xs sm:text-sm lg:text-base text-center">
              Solution
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map(exercise => (
            <TableRow key={exercise.id} className="group">
              <TableCell className="px-2 sm:px-4">
                <div>
                  <Checkbox
                    checked={doneExercisesId?.[exercise.id] || false}
                    onCheckedChange={() => {
                      changeStatus(exercise.id)
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] sm:max-w-none">
                <a
                  className="text-xs sm:text-sm lg:text-base text-foreground hover:text-foreground/90 inline-flex items-center gap-2 group-hover:underline"
                  target="_blank"
                  href={exercise.link}
                  rel="noreferrer"
                >
                  <span className="text-wrap">{exercise.problem}</span>
                  <ExternalLink
                    className="text-primary hover:text-primary/90 flex-shrink-0"
                    size={14}
                  />
                </a>
                <div className="md:hidden mt-1">
                  <span
                    className={cn(
                      'text-[10px] sm:text-xs px-2 py-0.5 rounded-full border',
                      difficultyColors[exercise.difficulty]
                    )}
                  >
                    {exercise.difficulty}
                  </span>
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  'hidden md:table-cell whitespace-nowrap',
                  difficultyColors[exercise.difficulty]
                )}
              >
                {exercise.difficulty}
              </TableCell>
              <TableCell className="px-2 sm:px-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      target="_blank"
                      href={exercise.solution}
                      rel="noreferrer"
                      className="flex items-center justify-center text-foreground hover:text-foreground/90 group-hover:scale-110 transition-transform"
                    >
                      <MonitorPlay
                        className="size-4 sm:size-5"
                        strokeWidth={1.2}
                      />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent side="left">View solution</TooltipContent>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
