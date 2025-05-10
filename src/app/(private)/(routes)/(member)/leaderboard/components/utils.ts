import { Positions } from '@prisma/client'

const POSITION_STYLES: Record<Positions, string> = {
  [Positions.ADMIN]:
    'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-purple-400/30',
  [Positions.BUILDER]:
    'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-400/30',
  [Positions.AMBASSADOR]:
    'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-indigo-400/30',
  [Positions.PSP]:
    'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 ring-yellow-400/30',
  [Positions.BASE]:
    'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 ring-slate-400/20'
} as const

const LEVEL_STYLES = {
  estagiario:
    'bg-violet-50 dark:bg-violet-700/20 text-violet-700 dark:text-violet-300 ring-violet-400/30',
  junior:
    'bg-violet-50 dark:bg-violet-800/20 text-violet-800 dark:text-violet-200 ring-violet-500/30',
  pleno:
    'bg-violet-50 dark:bg-violet-900/20 text-violet-900 dark:text-violet-100 ring-violet-600/30',
  senior:
    'bg-violet-50 dark:bg-violet-950/20 text-violet-950 dark:text-violet-50 ring-violet-700/30'
} as const

const DEFAULT_STYLE =
  'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 ring-slate-400/20'

export const getPositionStyle = (position?: Positions): string => {
  if (!position) return DEFAULT_STYLE
  return POSITION_STYLES[position] || DEFAULT_STYLE
}

export const getLevelStyle = (level?: string): string => {
  if (!level) return DEFAULT_STYLE
  const normalizedLevel = level.toLowerCase()
  return (
    LEVEL_STYLES[normalizedLevel as keyof typeof LEVEL_STYLES] || DEFAULT_STYLE
  )
}
