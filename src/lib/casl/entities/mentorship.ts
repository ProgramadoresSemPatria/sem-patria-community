import { z } from 'zod'

export const mentorshipSchema = z.object({
  __typename: z.literal('Mentorship').default('Mentorship')
})
