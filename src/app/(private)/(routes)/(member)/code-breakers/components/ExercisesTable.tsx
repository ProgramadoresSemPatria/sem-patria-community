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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs lg:text-sm">Status</TableHead>
          <TableHead className="text-xs lg:text-sm">Problem</TableHead>
          <TableHead className="hidden lg:table-cell">Difficulty</TableHead>
          <TableHead className="text-xs lg:text-sm text-center">
            Solution
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exercises.map(exercise => (
          <TableRow key={exercise.id}>
            <TableCell>
              <div>
                <Checkbox
                  checked={doneExercisesId?.[exercise.id] || false}
                  onCheckedChange={() => {
                    changeStatus(exercise.id)
                  }}
                />
              </div>
            </TableCell>
            <TableCell>
              <a
                className="text-xs lg:text-sm text-foreground hover:text-foreground/90"
                target="_blank"
                href={exercise.link}
                rel="noreferrer"
              >
                {exercise.problem}
                <ExternalLink
                  className="text-primary hover:text-primary/90 flex-shrink-0 inline-block ml-2 mb-1"
                  size={16}
                />
              </a>
            </TableCell>
            <TableCell
              className={cn(
                'hidden lg:table-cell',
                difficultyColors[exercise.difficulty]
              )}
            >
              {exercise.difficulty}
            </TableCell>
            <TableCell className="flex items-center justify-center">
              <a
                target="_blank"
                href={exercise.solution}
                rel="noreferrer"
                className="text-foreground hover:text-foreground/90"
              >
                <MonitorPlay className="size-5" strokeWidth={1.2} />
              </a>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
