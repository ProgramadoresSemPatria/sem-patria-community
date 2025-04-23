import { Positions } from '@prisma/client'

export const getPositionStyle = (position?: Positions) => {
  switch (position) {
    case Positions.ADMIN:
      return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 ring-purple-400/30'
    case Positions.BUILDER:
      return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-blue-400/30'
    case Positions.AMBASSADOR:
      return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-indigo-400/30'
    case Positions.PSP:
      return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 ring-yellow-400/30'
    default:
      return 'bg-slate-50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 ring-slate-400/20'
  }
}

export const getLevelStyle = (level?: string) => {
  switch (level?.toLowerCase()) {
    case 'estagiario':
      return 'bg-violet-50 dark:bg-violet-700/20 text-violet-700 dark:text-violet-300 ring-violet-400/30'
    case 'junior':
      return 'bg-violet-50 dark:bg-violet-800/20 text-violet-800 dark:text-violet-200 ring-violet-500/30'
    case 'pleno':
      return 'bg-violet-50 dark:bg-violet-900/20 text-violet-900 dark:text-violet-100 ring-violet-600/30'
    case 'senior':
      return 'bg-violet-50 dark:bg-violet-950/20 text-violet-950 dark:text-violet-50 ring-violet-700/30'
    default:
      return 'bg-gray-50 dark:bg-gray-800/20 text-gray-700 dark:text-gray-300 ring-gray-400/30'
  }
}
