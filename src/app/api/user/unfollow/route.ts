import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

export async function PATCH(req: NextRequest) {
  try {
    const { userId } = auth()
    const { targetId } = await req.json()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const userTarget = await prismadb.user.findUnique({
      where: {
        id: targetId
      },
      select: {
        id: true
      }
    })

    if (!userTarget) return new NextResponse('User not found', { status: 404 })

    const follow = await prismadb.userFollowersAndFollowing.findFirst({
      where: {
        userId,
        targetId: userTarget.id
      }
    })

    if (!follow) return new NextResponse('User not followed', { status: 400 })

    await Promise.all([
      await prismadb.userFollowersAndFollowing.delete({
        where: {
          id: follow.id
        }
      }),
      await prismadb.user.update({
        where: {
          id: userId
        },
        data: {
          followings: {
            decrement: 1
          }
        }
      }),
      await prismadb.user.update({
        where: {
          id: userTarget.id
        },
        data: {
          followers: {
            decrement: 1
          }
        }
      })
    ])

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    console.log('[USER_UNFOLLOW_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
