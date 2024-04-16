import { z } from 'zod'

export const eventSchema = z.object({
  __typename: z.literal('Event').default('Event')
})

export type Event = z.infer<typeof eventSchema>
