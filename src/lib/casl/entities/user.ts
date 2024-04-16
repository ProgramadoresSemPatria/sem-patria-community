import { z } from 'zod'

export const userSchema = z.object({
  __typename: z.literal('User').default('User')
})

export type User = z.infer<typeof userSchema>
