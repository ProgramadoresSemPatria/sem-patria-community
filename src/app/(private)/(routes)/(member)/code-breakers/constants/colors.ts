import type { TDifficulty } from '../types/IExercise'

export const difficultyColors: Record<TDifficulty, string> = {
  Easy: 'text-secondary hover:text-secondary/90',
  Medium: 'text-yellow-500 hover:text-yellow-600',
  Hard: 'text-destructive hover:text-destructive/90'
}

export const nodeColors = {
  background: 'bg-primary hover:bg-primary/90',
  progress: {
    track: 'bg-muted',
    bar: 'bg-secondary'
  }
} as const
