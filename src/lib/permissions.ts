import { type AbilityBuilder } from '@casl/ability'
import { type User } from '@prisma/client'
import { type AppAbility } from './casl/ability'
import { type UserAbilityRoles } from './types'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<UserAbilityRoles, PermissionsByRole> = {
  ADMIN: (user, { can }) => {
    can('manage', 'all')
  },
  BUILDER: (user, { can }) => {
    can('get', ['Category', 'Classroom', 'Course', 'Event', 'User'], {})
    can('get', 'CMS')
  },
  MEMBER: (user, { can, cannot }) => {
    cannot('manage', 'all')
    can('delete', 'Post', { userId: user.id })
  }
}
