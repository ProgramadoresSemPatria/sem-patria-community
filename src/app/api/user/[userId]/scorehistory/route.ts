import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

// GET - /api/user/[userId]/scorehistory - get scorehistory of an user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.userId)
      return new NextResponse('User id required', { status: 400 })

    const userScoreActivity = await prismadb.scoreHistory.findMany({
      where: {
        userId: params.userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        resource: {
          select: {
            baseScore: true,
            disabled: true,
            resource: true
          }
        }
      }
    })

    if (!userScoreActivity)
      return NextResponse.json(
        { error: 'Score Activity not found for this user' },
        { status: 404 }
      )

    return NextResponse.json({
      data: {
        userId: params.userId,
        activity: userScoreActivity
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching score history' },
      { status: 500 }
    )
  }
}
