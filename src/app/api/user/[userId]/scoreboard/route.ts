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

    // Buscar a temporada ativa primeiro
    const activeSeason = await prismadb.season.findFirst({
      where: {
        isCurrent: true
      },
      select: {
        id: true
      }
    })

    if (!activeSeason) {
      return NextResponse.json(
        {
          error: 'No active season found'
        },
        { status: 404 }
      )
    }

    // Use upsert to find or create the scoreboard
    const userScore = await prismadb.scoreboard.upsert({
      where: {
        userId_seasonId: {
          userId: params.userId,
          seasonId: activeSeason.id
        }
      },
      update: {}, // Not needed to update anything, just retrieve
      create: {
        userId: params.userId,
        points: 0,
        seasonId: activeSeason.id
      },
      select: {
        id: true,
        points: true,
        seasonId: true
      }
    })

    return NextResponse.json({
      data: {
        userId: params.userId,
        points: userScore.points,
        seasonId: userScore.seasonId
      }
    })
  } catch (error) {
    console.error('Error in scoreboard route:', error)
    return NextResponse.json(
      { error: 'Error fetching or creating scoreboard' },
      { status: 500 }
    )
  }
}
