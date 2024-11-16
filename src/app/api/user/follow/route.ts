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

    await Promise.all([
      await prismadb.userFollowersAndFollowing.create({
        data: {
          userId,
          targetId: userTarget.id
        }
      }),
      await prismadb.user.update({
        where: {
          id: userId
        },
        data: {
          followings: {
            increment: 1
          }
        }
      }),
      await prismadb.user.update({
        where: {
          id: userTarget.id
        },
        data: {
          followers: {
            increment: 1
          }
        }
      })
    ])

    return NextResponse.json({}, { status: 201 })
  } catch (error) {
    console.log('[USER_FOLLOW_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
