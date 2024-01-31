import prismadb from '@/lib/prismadb'

export const getUser = async (userId: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: userId
      }
    })
    return user
  } catch (error) {}
}
