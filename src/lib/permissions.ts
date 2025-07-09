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
  MEMBER: (user, { can }) => {
    can('delete', 'Post', { userId: { equals: user.id } })
    can('create', 'Post')
    can('get', 'Post')
    can('like', 'Post')
    can('comment', 'Post')
    can('view_comment', 'Post')
  },
  PRE_BASE: (user, { can }) => {
    can('get', 'Post')
    can('view_comment', 'Post')
  }
}
