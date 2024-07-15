import { type ExtendedComment } from '@/app/(private)/(routes)/(member)/forum/[postId]/[...titleSlug]/page'
import prismadb from '@/lib/prismadb'
import { type Category, type Post, type User } from '@prisma/client'

export type ExtendedPost = Post & {
  category: Category
  user: User
  comments: ExtendedComment[]
}

export type PostProps = {
  post: ExtendedPost
}
export const getPost = async (postId: string) => {
  const postById = await prismadb.post.findFirst({
    where: {
      id: postId
    },
    include: {
      category: true,
      comments: {
        include: {
          likes: true,
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                  name: true,
                  imageUrl: true
                }
              },
              likes: true
            }
          },
          user: {
            select: {
              id: true,
              username: true,
              name: true,
              imageUrl: true
            }
          }
        }
      },
      likes: true,
      user: {
        select: {
          id: true,
          username: true,
          name: true,
          imageUrl: true
        }
      }
    }
  })

  return postById
}
