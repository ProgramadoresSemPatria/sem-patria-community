import { z } from 'zod'

export const seasonSchema = z.object({
  __typename: z.literal('Season').default('Season')
})

export type Season = z.infer<typeof seasonSchema>
