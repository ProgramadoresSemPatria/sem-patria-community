import prismadb from '@/lib/prismadb'
import { calculateMultiplier } from '@/lib/utils'
import { type AwardEnum } from '@prisma/client'

interface AddScoreParams {
  userId: string
  targetId: string
  points: number
  resource: AwardEnum
  isManual?: boolean
}

export async function addScore({
  userId,
  targetId,
  points,
  resource,
  isManual = false
}: AddScoreParams) {
  const user = await prismadb.user.findUnique({
    where: { id: targetId },
    select: { position: true }
  })

  if (!user) {
    throw new Error('User not found')
  }

  const currentSeason = await prismadb.season.findFirst({
    where: {
      isCurrent: true
    }
  })

  if (!currentSeason) {
    throw new Error('There is no active season')
  }

  const multiplier = calculateMultiplier(user.position || 'base')
  const finalPoints = points * multiplier

  const awardResource = await prismadb.awardResource.findUnique({
    where: { resource }
  })

  if (!awardResource) {
    throw new Error('Resource not found')
  }

  const userScore = await prismadb.scoreboard.findUnique({
    where: {
      userId: targetId
    },
    select: {
      points: true
    }
  })

  if (!userScore) {
    await prismadb.scoreboard.create({
      data: {
        userId: targetId,
        points: finalPoints,
        seasonId: currentSeason.id
      }
    })
  } else {
    const { points: previousPoints } = userScore ?? { points: 0 }

    await prismadb.scoreboard.update({
      where: {
        userId: targetId
      },
      data: {
        points: previousPoints + finalPoints,
        seasonId: currentSeason.id
      }
    })
  }

  await prismadb.scoreHistory.create({
    data: {
      userId,
      targetId,
      points: finalPoints,
      resourceId: awardResource.id,
      multiplier,
      isManual,
      seasonId: currentSeason.id
    }
  })
}
