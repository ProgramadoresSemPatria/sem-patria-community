import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateUserLevelColor = (level: string): string => {
  const color: Record<string, string> = {
    unknown: 'bg-gray-800 hover:bg-gray-800',
    junior: 'bg-violet-800 hover:bg-violet-800',
    pleno: 'bg-violet-900 hover:bg-violet-900',
    senior: 'bg-violet-950 hover:bg-violet-950'
  }

  return color[level]
}

export const validateCourseLevelColor = (level: string): string => {
  const color: Record<string, string> = {
    beginner: 'bg-violet-800 hover:bg-violet-800 text-gray-100',
    intermediate: 'bg-purple-800 hover:bg-purple-800 text-gray-100',
    advanced: 'bg-fuchsia-900 hover:bg-fuchsia-900 text-gray-100'
  }

  return color[level]
}

export const validateCourseIsPendingColor = (
  isPending: boolean
): { background: string; text: string } => {
  const styles = {
    pending: {
      background: 'bg-orange-500 hover:bg-orange-600 text-gray-100',
      text: 'Pending'
    },
    approved: {
      background: 'bg-green-500 hover:bg-green-600 text-gray-100',
      text: 'Approved'
    }
  }

  return isPending ? styles.pending : styles.approved
}
