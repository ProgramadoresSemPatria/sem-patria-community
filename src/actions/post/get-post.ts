import prismadb from '@/lib/prismadb'

export const getPost = async (postId: string, title: string) => {
  const postById = await prismadb.post.findFirst({
    where: {
      id: {
        startsWith: postId
      },
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
