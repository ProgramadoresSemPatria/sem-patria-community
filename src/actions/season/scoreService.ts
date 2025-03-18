import { PrismaClient, type AwardEnum } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'

const prisma = new PrismaClient()

export async function awardPoints(
  userId: string,
  resourceType: AwardEnum,
  targetId?: string,
  metadata?: InputJsonValue
) {
  // Buscar a temporada atual
  const currentSeason = await prisma.season.findFirst({
    where: { isCurrent: true },
    include: {
      positionMultipliers: true
    }
  })

  if (!currentSeason) {
    throw new Error('Nenhuma temporada ativa encontrada')
  }

  // Buscar o recurso
  const resource = await prisma.awardResource.findUnique({
    where: { resource: resourceType }
  })

  if (!resource || resource.disabled) {
    throw new Error('Recurso não encontrado ou desabilitado')
  }

  // Buscar o usuário para obter sua posição
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { position: true }
  })

  if (!user) {
    throw new Error('Usuário não encontrado')
  }

  // Buscar o multiplicador para a posição do usuário
  let multiplier = 1.0 // Valor padrão

  if (user.position) {
    const positionMultiplier = currentSeason.positionMultipliers.find(
      pm => pm.position === user.position
    )

    if (positionMultiplier) {
      multiplier = positionMultiplier.multiplier
    }
  }

  // Calcular os pontos
  const points = resource.baseScore * multiplier

  // Registrar o histórico
  await prisma.scoreHistory.create({
    data: {
      userId,
      targetId,
      resourceId: resource.id,
      points,
      multiplier,
      seasonId: currentSeason.id,
      metadata
    }
  })

  // Atualizar o placar
  await prisma.scoreboard.upsert({
    where: {
      userId_seasonId: {
        userId,
        seasonId: currentSeason.id
      }
    },
    update: {
      points: {
        increment: points
      }
    },
    create: {
      userId,
      seasonId: currentSeason.id,
      points
    }
  })

  return { points, multiplier }
}
