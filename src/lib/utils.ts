import { Roles, type User } from '@prisma/client'
import { clsx, type ClassValue } from 'clsx'
import { format } from 'date-fns'
import { twMerge } from 'tailwind-merge'
import { type UserAbilityRoles } from './types'

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

export const validateIsPendingColor = (
  isPending: boolean
): { background: string; text: string } => {
  const styles = {
    pending: {
      background: 'bg-rose-600 hover:bg-rose-600 text-gray-100',
      text: 'Pending'
    },
    approved: {
      background: 'bg-teal-600 hover:bg-teal-600 text-gray-100',
      text: 'Approved'
    }
  }

  return isPending ? styles.pending : styles.approved
}

export const formatExternalUrl = (url: string): string => {
  const hasHttps = url.includes('https://')
  if (hasHttps) return url

  return `https://${url}`
}

export const formatTitle = (title: string) => {
  const titleHref: Record<string, string> = {
    'a-base': 'A Base',
    psp: 'Programador Sem Pátria',
    prime: 'Programador Prime',
    'perfil-fechado': 'Perfil Fechado'
  }

  return titleHref[title]
}

export const getStringFromDate = (date: string) => {
  const commentDate = new Date(date)
  const todayDate = new Date()

  const diff = todayDate.getTime() - commentDate.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) / 60
  )

  if (days > 0) {
    if (days > 7) {
      return format(commentDate, 'dd/MM/yyyy')
    }
    return `${days} days ago`
  } else if (hours > 0) {
    return `${hours} hours ago`
  } else {
    return `${minutes} minutes ago`
  }
}

export const defineUserRole = (user: User): UserAbilityRoles => {
  const hasAdmin = user.role.some(role => role === Roles.Admin)
  const hasBuilder = user.role.some(role => role === Roles.Builder)

  if (hasAdmin) return 'ADMIN'
  if (hasBuilder) return 'BUILDER'
  return 'MEMBER'
}
