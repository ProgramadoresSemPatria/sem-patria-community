import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import type { Prisma } from '@prisma/client'
import { NextResponse } from 'next/server'

// GET - /api/season/[seasonId]/scorehistory - get score history of all users of current season
export async function GET(
  request: Request,
  { params }: { params: { seasonId: string } }
) {
  try {
    const { seasonId } = params
    const { userId } = auth()
    const url = new URL(request.url)
    const cursor = url.searchParams.get('cursor')
    const limit = parseInt(url.searchParams.get('limit') || '20')

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const query: Prisma.ScoreHistoryFindManyArgs = {
      where: {
        seasonId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            username: true
          }
        },
        resource: true,
        season: {
          select: {
            id: true,
            name: true
          }
        }
      },
      take: limit
    }

    // Add cursor if provided
    if (cursor) {
      query.cursor = {
        id: cursor
      }
      query.skip = 1 // Skip the cursor item
    }

    const scoreHistoryItems = await prismadb.scoreHistory.findMany(query)

    // Process the data to include target user information when available
    const formattedScoreHistory = await Promise.all(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scoreHistoryItems.map(async (item: any) => {
        let targetUser = null

        if (item.targetId) {
          targetUser = await prismadb.user.findUnique({
            where: { id: item.targetId },
            select: {
              id: true,
              name: true,
              imageUrl: true,
              username: true
            }
          })
        }

        return {
          id: item.id,
          points: item.points,
          multiplier: item.multiplier,
          createdAt: item.createdAt.toISOString(),
          isManual: item.isManual,
          user: {
            id: item.user.id,
            name: item.user.name,
            imageUrl: item.user.imageUrl,
            username: item.user.username
          },
          target: targetUser,
          resource: {
            id: item.resource.id,
            resource: item.resource.resource,
            baseScore: item.resource.baseScore
          },
          season: {
            id: item.season.id,
            name: item.season.name
          },
          metadata: item.metadata
        }
      })
    )

    const nextCursor =
      scoreHistoryItems.length === limit
        ? scoreHistoryItems[scoreHistoryItems.length - 1].id
        : null

    return NextResponse.json({
      data: formattedScoreHistory,
      nextCursor
    })
  } catch (error) {
    console.error('[SCORE_HISTORY_GET]', error)
    return NextResponse.json(
      { error: 'Error fetching score history' },
      { status: 500 }
    )
  }
}
