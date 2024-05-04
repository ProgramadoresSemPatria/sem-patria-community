'use server'
import prismadb from '@/lib/prismadb'

export const getUser = async (userId: string) => {
  const user = await prismadb.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) throw new Error('User not found')

  return user
}
