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

    const followingIds = await prismadb.userFollowersAndFollowing.findMany({
      where: { userId: params.userId },
      select: { targetId: true }
    })

    const users = await prismadb.user.findMany({
      where: { id: { in: followingIds.map(id => id.targetId) } },
      select: { id: true, imageUrl: true, username: true }
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.log('[USER_GET_FOLLOWING_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
