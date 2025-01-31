'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "./ui/table";
  import { ExternalLink, MonitorPlay } from "lucide-react";
  import { IExercise, TDifficulty } from "../types/IExercise";
  import { useDoneExerciseStore } from "../stores/useDoneExerciseStore";
  import { Checkbox } from "./ui/checkbox";
  
  interface ExercisesTableProps {
    exercises: IExercise[];
  }
  
  const difficultyColors: Record<TDifficulty, string> = {
    Easy: "#19b181",
    Medium: "#dfb339",
    Hard: "red",
  };
  
  export function ExercisesTable({ exercises }: ExercisesTableProps) {
    const { doneExercisesId } = useDoneExerciseStore();
  
    const changeStatus = (exerciseId: string) => {
      const isExerciseDone = doneExercisesId?.[exerciseId] || false;
      if (!isExerciseDone) {
        markExerciseAsDone(exerciseId);
        return;
      }
      markExerciseAsUndone(exerciseId);
    };
  
    const markExerciseAsDone = (exerciseId: string) => {
        useDoneExerciseStore.setState({
        doneExercisesId: {
          ...doneExercisesId,
          [exerciseId]: true,
        },
      });
    };
  
    const markExerciseAsUndone = (exerciseId: string) => {
      const filteredExercises = doneExercisesId;
      delete filteredExercises?.[exerciseId];
      useDoneExerciseStore.setState({
        doneExercisesId: filteredExercises,
      });
    };
  
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
          {exercises.map((exercise) => (
            <TableRow
              key={exercise.id}
            >
              <TableCell>
                <div>
                  <Checkbox
                    checked={doneExercisesId?.[exercise.id] || false}
                    onChange={() => changeStatus(exercise.id)}
                  />
                </div>
              </TableCell>
              <TableCell>
                <a
                  className="text-xs lg:text-sm dark:text-[#F5F5F5]"
                  target="_blank'"
                  href={exercise.link}
                >
                  {exercise.problem}
                  <ExternalLink
                    className="text-[#5316CC] dark:text-[#9c9c9c] flex-shrink-0 inline-block ml-2 mb-1"
                    size={16}
                  />
                </a>
              </TableCell>
              <TableCell
                style={{ color: difficultyColors[exercise.difficulty] }}
                className="hidden lg:table-cell"
              >
                {exercise.difficulty}
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <a target="_blank" href={exercise.solution}>
                  <MonitorPlay
                    className="dark:text-[#F5F5F5] size-5"
                    strokeWidth={1.2}
                  />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }