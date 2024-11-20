import { type AbilityBuilder } from '@casl/ability'
import { type User } from '@prisma/client'
import { type AppAbility } from './casl/ability'
import { type UserAbilityRoles } from './types'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>
) => void

export const permissions: Record<UserAbilityRoles, PermissionsByRole> = {
  ADMIN: (_, { can }) => {
    can('manage', 'all')
  },
  BUILDER: (_, { can }) => {
    can(
      'get',
      ['Category', 'Classroom', 'Course', 'Event', 'User', 'Interest'],
      {}
    )
    can('get', 'CMS')
  },
  MEMBER: (user, { can }) => {
    can('delete', 'Post', { userId: { equals: user.id } })
  }
}
