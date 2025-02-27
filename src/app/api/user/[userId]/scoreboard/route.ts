import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse, type NextRequest } from 'next/server'

// GET - /api/user/[userId]/scoreboard - get scoreboard of an user
export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    if (!params.userId)
      return new NextResponse('User id required', { status: 400 })

    const userScore = await prismadb.scoreboard.findFirst({
      where: {
        userId: params.userId
      },
      select: {
        points: true
      }
    })

    if (!userScore)
      return NextResponse.json(
        { error: 'Score not found for this user' },
        { status: 404 }
      )

    return NextResponse.json({
      data: {
        userId: params.userId,
        points: userScore.points
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching scoreboard' },
      { status: 500 }
    )
  }
}
