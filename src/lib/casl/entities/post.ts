import { z } from 'zod'

export const postSchema = z.object({
  __typename: z.literal('Post').default('Post'),
  userId: z.string()
})

export type Post = z.infer<typeof postSchema>
