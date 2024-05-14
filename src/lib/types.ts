import {
  type Category,
  type Comment,
  type Like,
  type Post,
  type User
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
  PerfilFechado = 'Perfil Fechado',
  PortifolioBoostProgram = 'Portifólio Boost Program',
  Base = 'Base',
  ProgramadorSemPatria = 'Programador Sem Pátria',
  Prime = 'Prime',
  Builder = 'Builder',
  Admin = 'Admin'
}

export type ExtendedPost = Post & {
  category: Category
  likes: Like[]
  user: User
  comments: Comment[]
}

export type UserAbilityRoles = 'ADMIN' | 'BUILDER' | 'MEMBER'
