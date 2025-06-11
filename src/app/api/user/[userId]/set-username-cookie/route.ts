import { NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'

export async function POST() {
  const user = await currentUser()

  if (!user?.id) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const username =
    user.username ||
    (
      await prismadb.user.findUnique({
        where: { id: user.id },
        select: { username: true }
      })
    )?.username

  if (!username) {
    return new NextResponse('Username not found', { status: 404 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('x-username', username, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  })

  return response
}
