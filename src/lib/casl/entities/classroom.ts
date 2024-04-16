import { z } from 'zod'

export const classroomSchema = z.object({
  __typename: z.literal('Classroom').default('Classroom')
})

export type Classroom = z.infer<typeof classroomSchema>
