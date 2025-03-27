'use server'
import type { ScoreHistoryItem } from '@/hooks/score-history/types'
import prismadb from '@/lib/prismadb'

export const getScoreActivityBySeason = async (seasonId: string) => {
  // Search the first 20 score history items
  const scoreHistoryItems = await prismadb.scoreHistory.findMany({
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
          imageUrl: true
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
    take: 20
  })

  // Processar os dados para incluir informações do usuário alvo quando disponível
  const formattedScoreActivities: ScoreHistoryItem[] = await Promise.all(
    scoreHistoryItems.map(async item => {
      let targetUser = null

      if (item.targetId) {
        targetUser = await prismadb.user.findUnique({
          where: { id: item.targetId },
          select: {
            id: true,
            name: true,
            imageUrl: true
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
          imageUrl: item.user.imageUrl
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

  return formattedScoreActivities
}
