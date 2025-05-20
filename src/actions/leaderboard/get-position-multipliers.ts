'use server'

import prismadb from '@/lib/prismadb'
import { type PositionMultiplier } from '@prisma/client'

export const getPositionMultipliers = async (
  seasonId: string
): Promise<PositionMultiplier[]> => {
  try {
    const positionMultipliers = await prismadb.positionMultiplier.findMany({
      where: {
        seasonId
      },
      orderBy: {
        multiplier: 'desc'
      }
    })
    return positionMultipliers
  } catch (error) {
    console.error('[GET_POSITION_MULTIPLIERS_ERROR]', error)
    return []
  }
}
