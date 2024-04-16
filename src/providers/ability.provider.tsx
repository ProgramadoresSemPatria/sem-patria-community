'use client'

import { AbilityContext } from '@/hooks/use-ability'
import { defineAbilityFor } from '@/lib/casl/ability'
import { defineUserRole } from '@/lib/utils'
import { type User } from '@prisma/client'

interface Props {
  user: User
  children: React.ReactNode
}

const AbilityProvider = ({ user, children }: Props) => {
  const ability = defineAbilityFor(user, defineUserRole(user))

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  )
}

export { AbilityProvider }
