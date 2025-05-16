import { PrismaClient, type AwardEnum } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()

export async function awardPoints(
  userId: string,
  resourceType: AwardEnum,
  targetId?: string,
  metadata?: InputJsonValue
) {
  try {
    // Validation to avoid self-scoring
    if (targetId && targetId === userId) {
      console.warn('Self-scoring attempt detected:', {
        userId,
        resourceType,
        targetId
      })
      return {
        success: false,
        error: 'It is not allowed to score yourself'
      }
    }

    // Verificar se o targetId existe, pois é quem receberá os pontos
    if (!targetId) {
      console.error('Target ID is required to award points')
      return { success: false, error: 'Target ID is required' }
    }

    const currentSeason = await prisma.season.findFirst({
      where: { isCurrent: true },
      include: {
        positionMultipliers: true
      }
    })

    if (!currentSeason) {
      console.error('No active season found')
      return { success: false, error: 'No active season found' }
    }

    // Search for the resource
    const resource = await prisma.awardResource.findUnique({
      where: { resource: resourceType }
    })

    if (!resource || resource.disabled) {
      console.error('Resource not found or disabled:', resourceType)
      return { success: false, error: 'Resource not found or disabled' }
    }

    // Buscar o usuário alvo (targetId) para aplicar o multiplicador correto
    const targetUser = await prisma.user.findUnique({
      where: { id: targetId },
      select: { position: true }
    })

    if (!targetUser) {
      console.error('Target user not found:', targetId)
      return { success: false, error: 'Target user not found' }
    }

    let multiplier = 1.0 // Default value

    if (targetUser.position) {
      const positionMultiplier = currentSeason.positionMultipliers.find(
        pm => pm.position === targetUser.position
      )

      if (positionMultiplier) {
        multiplier = positionMultiplier.multiplier
      }
    }

    // Calculate the points
    const points = resource.baseScore * multiplier

    // Use transaction to ensure atomicity
    return await prisma.$transaction(async tx => {
      // Register the history - userId é quem realizou a ação, targetId é quem recebe os pontos
      await tx.scoreHistory.create({
        data: {
          userId, // Quem realizou a ação
          targetId, // Quem recebeu a ação
          resourceId: resource.id,
          points,
          multiplier,
          seasonId: currentSeason.id,
          metadata
        }
      })

      // Buscar o scoreboard do usuário alvo (targetId)
      const existingScoreboard = await tx.scoreboard.findFirst({
        where: {
          userId: targetId, // Alterado para targetId
          seasonId: currentSeason.id
        }
      })

      if (existingScoreboard) {
        // Atualizar o scoreboard do usuário alvo
        await tx.scoreboard.update({
          where: {
            id: existingScoreboard.id
          },
          data: {
            points: {
              increment: points
            }
          }
        })
      } else {
        // Criar um novo scoreboard para o usuário alvo
        await tx.scoreboard.create({
          data: {
            userId: targetId, // Alterado para targetId
            seasonId: currentSeason.id,
            points
          }
        })
      }

      return { success: true, points, multiplier }
    })
  } catch (error) {
    console.error('[AWARD_POINTS_ERROR]', error)
    return { success: false, error: 'Failed to award points' }
  }
}

export async function removePoints(
  userId: string, // Quem realiza a ação
  resourceType: AwardEnum,
  targetId?: string // De quem os pontos serão removidos
) {
  try {
    // Verificar se o targetId existe, pois é de quem os pontos serão removidos
    if (!targetId) {
      console.error('Target ID is required to remove points')
      return { success: false, error: 'Target ID is required' }
    }

    const currentSeason = await prisma.season.findFirst({
      where: { isCurrent: true }
    })

    if (!currentSeason) {
      console.error('No active season found')
      return { success: false, error: 'No active season found' }
    }

    // Search for the resource
    const resource = await prisma.awardResource.findUnique({
      where: { resource: resourceType }
    })

    if (!resource || resource.disabled) {
      console.error('Resource not found or disabled:', resourceType)
      return { success: false, error: 'Resource not found or disabled' }
    }

    // Use transaction to ensure atomicity
    return await prisma.$transaction(async tx => {
      // Find the most recent score history for this action
      const scoreHistory = await tx.scoreHistory.findFirst({
        where: {
          userId, // Quem realizou a ação
          targetId, // Quem recebeu a ação
          resourceId: resource.id,
          seasonId: currentSeason.id
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      if (!scoreHistory) {
        return { success: false, error: 'No score history found to remove' }
      }

      // Delete the score history
      await tx.scoreHistory.delete({
        where: {
          id: scoreHistory.id
        }
      })

      // Find the scoreboard of the target user
      const scoreboard = await tx.scoreboard.findFirst({
        where: {
          userId: targetId, // Alterado para targetId
          seasonId: currentSeason.id
        }
      })

      if (!scoreboard) {
        return { success: false, error: 'Scoreboard not found' }
      }

      // Update the scoreboard by decrementing the points
      await tx.scoreboard.update({
        where: {
          id: scoreboard.id
        },
        data: {
          points: {
            decrement: scoreHistory.points
          }
        }
      })

      return {
        success: true,
        pointsRemoved: scoreHistory.points
      }
    })
  } catch (error) {
    console.error('[REMOVE_POINTS_ERROR]', error)
    return { success: false, error: 'Failed to remove points' }
  }
}
