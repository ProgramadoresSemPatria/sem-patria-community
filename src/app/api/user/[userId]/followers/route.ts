import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.userId)
      return new NextResponse('User id required', { status: 400 })

    const followersIds = await prismadb.userFollowersAndFollowing.findMany({
      where: { targetId: params.userId },
      select: { userId: true }
    })

    const users = await prismadb.user.findMany({
      where: { id: { in: followersIds.map(id => id.userId) } },
      select: { id: true, imageUrl: true, username: true }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.log('[USER_GET_FOLLOWERS_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
