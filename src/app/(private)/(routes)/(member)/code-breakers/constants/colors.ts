import type { TDifficulty } from '../types/IExercise'

export const difficultyColors: Record<TDifficulty, string> = {
  Easy: 'text-secondary hover:text-secondary/90',
  Medium: 'text-yellow-500 hover:text-yellow-600',
  Hard: 'text-destructive hover:text-destructive/90'
}

export const nodeColors = {
  background: 'bg-primary hover:bg-primary hover:brightness-90',
  progress: {
    track: 'bg-brand-purple-400 dark:bg-muted',
    bar: 'bg-secondary'
  }
} as const
