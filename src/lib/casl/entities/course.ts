import { z } from 'zod'

export const courseSchema = z.object({
  __typename: z.literal('Course').default('Course')
})

export type Course = z.infer<typeof courseSchema>
