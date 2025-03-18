import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { Positions } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema para os multiplicadores por posição
const positionMultiplierSchema = z.object({
  id: z.string().optional(),
  position: z.nativeEnum(Positions),
  multiplier: z.number().min(0).default(1.0)
})

// Schema atualizado para atualização de temporada
const updateSeasonSchema = z.object({
  name: z.string(),
  initDate: z.string(),
  endDate: z.string(),
  isCurrent: z.boolean(),
  metadata: z.object({
    awards: z.array(
      z.object({
        position: z.string(),
        description: z.string()
      })
    ),
    description: z.string()
  }),
  positionMultipliers: z.array(positionMultiplierSchema).optional()
})

// PATCH - /api/season/[seasonId] - update season
export async function PATCH(
  req: NextRequest,
  { params }: { params: { seasonId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const body = await req.json()
    const parsed = updateSeasonSchema.safeParse(body)

    if (!parsed.success) {
      return new NextResponse('Invalid information provided', { status: 401 })
    }

    const { positionMultipliers, ...seasonData } = parsed.data

    // Atualizar a temporada
    await prismadb.season.update({
      where: {
        id: params.seasonId
      },
      data: {
        ...seasonData
      }
    })

    // Atualizar os multiplicadores por posição
    if (positionMultipliers && positionMultipliers.length > 0) {
      // Primeiro, excluir os multiplicadores existentes
      await prismadb.positionMultiplier.deleteMany({
        where: {
          seasonId: params.seasonId
        }
      })

      // Em seguida, criar os novos multiplicadores
      await prismadb.positionMultiplier.createMany({
        data: positionMultipliers.map(pm => ({
          seasonId: params.seasonId,
          position: pm.position,
          multiplier: pm.multiplier
        }))
      })
    }

    // Buscar a temporada atualizada com os multiplicadores
    const updatedSeason = await prismadb.season.findUnique({
      where: { id: params.seasonId },
      include: {
        positionMultipliers: true
      }
    })

    return NextResponse.json({
      data: updatedSeason,
      message: 'Season updated successfully'
    })
  } catch (error) {
    console.log('[SEASON_ID_PATCH_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// DELETE - /api/season/[seasonId] - delete season
export async function DELETE(
  req: NextRequest,
  { params }: { params: { seasonId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    // Primeiro, excluir os multiplicadores relacionados
    await prismadb.positionMultiplier.deleteMany({
      where: {
        seasonId: params.seasonId
      }
    })

    // Em seguida, excluir a temporada
    await prismadb.season.delete({
      where: {
        id: params.seasonId
      }
    })

    return NextResponse.json({
      message: 'Season deleted successfully'
    })
  } catch (error) {
    console.log('[SEASON_ID_DELETE_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// GET - /api/season/:id - get season by id
export async function GET(
  req: NextRequest,
  { params }: { params: { seasonId: string } }
) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const season = await prismadb.season.findUnique({
      where: { id: params.seasonId },
      include: {
        positionMultipliers: true
      }
    })

    if (!season) {
      return new NextResponse('Season not found', { status: 404 })
    }

    return NextResponse.json({ data: season })
  } catch (error) {
    console.log('[SEASON_ID_GET_ERROR]', error)
    return new NextResponse('Error retrieving season', { status: 500 })
  }
}
