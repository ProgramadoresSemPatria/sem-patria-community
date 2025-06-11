'use server'

import prismadb from '@/lib/prismadb'
import { type CurrentSeasonResponse, type SeasonMetadata } from './types'

export async function getCurrentSeason(): Promise<CurrentSeasonResponse> {
  try {
    const currentSeason = await prismadb.season.findFirst({
      where: { isCurrent: true },
      include: {
        scores: {
          orderBy: {
            points: 'desc'
          },
          take: 50,
          include: {
            user: {
              select: {
                id: true,
                name: true,
                username: true,
                level: true,
                position: true,
                imageUrl: true
              }
            }
          }
        }
      }
    })

    if (!currentSeason) {
      return null
    }

    return {
      ...currentSeason,
      metadata: currentSeason.metadata as SeasonMetadata
    }
  } catch (error) {
    console.error('Error fetching current season:', error)
    return null
  }
}
