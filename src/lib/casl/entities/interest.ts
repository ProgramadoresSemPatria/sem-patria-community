import { z } from 'zod'

export const interestSchema = z.object({
  __typename: z.literal('Interest').default('Interest')
})

export type Interest = z.infer<typeof interestSchema>
