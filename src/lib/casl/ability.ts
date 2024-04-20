import { AbilityBuilder, type PureAbility } from '@casl/ability'
import { createPrismaAbility, type PrismaQuery } from '@casl/prisma'
import { type User } from '@prisma/client'
import { z } from 'zod'
import { permissions } from '../permissions'
import { type UserAbilityRoles } from '../types'
import {
  categorySubject,
  classroomSubject,
  cmsSubject,
  courseSubject,
  eventSubject,
  userSubject
} from './subjects'

const appAbilitiesSchema = z.union([
  userSubject,
  courseSubject,
  categorySubject,
  eventSubject,
  classroomSubject,
  cmsSubject,

  z.tuple([z.literal('manage'), z.literal('all')])
])
export type AppAbilities = z.infer<typeof appAbilitiesSchema>

export type AppAbility = PureAbility<AppAbilities, PrismaQuery>

export function defineAbilityFor(user: User, role: UserAbilityRoles) {
  const builder = new AbilityBuilder<AppAbility>(createPrismaAbility)

  if (typeof permissions[role] !== 'function') {
    throw new Error(`Permissions for role ${role} are not defined.`)
  }

  permissions[role](user, builder)

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename
    }
  })

  return ability
}
