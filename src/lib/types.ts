import {
  type Attachment,
  type Category,
  type Comment,
  type Like,
  type Post,
  type User,
  type Video
} from '@prisma/client'

export type MenuItemProps = {
  href: string
  label: string
  active?: boolean
  disabled?: boolean
  icon?: React.ReactNode
}
export type MentorshipPhasesProps = {
  href: string
  src: string
  title: string
}

export type MentorshipProgramModuleProps = {
  image: string
}

export enum Roles {
  PrePsp = 'Pre PSP',
  Base = 'Base',
  ProgramadorSemPatria = 'Programador Sem Pátria',
  Prime = 'Prime',
  Admin = 'Admin'
}

export enum Positions {
  BASE = 'Base',
  PSP = 'PSP',
  BUILDER = 'Builder',
  AMBASSADOR = 'Ambassador',
  ADMIN = 'Admin'
}

export type ExtendedPost = Post & {
  category: Category
  likes: Like[]
  user: User
  comments: Comment[]
}

export type VideoWithAttachments = Video & {
  attachments: Attachment[]
}

export type UserAbilityRoles = 'ADMIN' | 'MEMBER'
