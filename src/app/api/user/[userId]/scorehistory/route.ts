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

    // Get the current season ordered by createdAt and then by isCurrent
    const userScoreActivity = await prismadb.scoreHistory.findMany({
      where: {
        targetId: params.userId
      },
      orderBy: [
        {
          season: {
            isCurrent: 'desc'
          }
        },
        {
          createdAt: 'desc'
        }
      ],
      include: {
        resource: {
          select: {
            baseScore: true,
            disabled: true,
            resource: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            position: true,
            imageUrl: true
          }
        },
        season: {
          select: {
            name: true,
            isCurrent: true,
            positionMultipliers: true
          }
        }
      }
    })

    if (!userScoreActivity)
      return NextResponse.json({
        data: {
          userId: params.userId,
          activities: []
        }
      })

    const formattedActivity = userScoreActivity.map(activity => {
      const positionMultiplier = activity.user.position
        ? activity.season.positionMultipliers.find(
            pm => pm.position === activity.user.position
          )?.multiplier ?? 1.0
        : 1.0

      const calculatedPoints = activity.resource.baseScore * positionMultiplier

      return {
        id: activity.id,
        points: calculatedPoints,
        date: activity.createdAt,
        source: {
          type: activity.resource.resource,
          baseScore: activity.resource.baseScore
        },
        multiplier: positionMultiplier,
        user: {
          id: activity.user.id,
          name: activity.user.name,
          username: activity.user.username,
          imageUrl: activity.user.imageUrl
        },
        season: {
          name: activity.season.name,
          isCurrent: activity.season.isCurrent
        }
      }
    })

    return NextResponse.json({
      data: {
        userId: params.userId,
        activities: formattedActivity
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching score history' },
      { status: 500 }
    )
  }
}
