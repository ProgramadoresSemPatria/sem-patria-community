import { z } from 'zod'

export const categorySchema = z.object({
  __typename: z.literal('Category').default('Category')
})

export type Category = z.infer<typeof categorySchema>
