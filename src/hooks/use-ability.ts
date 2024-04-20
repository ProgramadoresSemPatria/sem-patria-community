import { type AppAbility } from '@/lib/casl/ability'
import { createContextualCan } from '@casl/react'
import { createContext } from 'react'

type ContextAbility = AppAbility

export const AbilityContext = createContext<ContextAbility>(
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  {} as ContextAbility
)
export const Can = createContextualCan(AbilityContext.Consumer)
