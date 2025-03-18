import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { Positions } from '@prisma/client'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema para os multiplicadores por posição
const positionMultiplierSchema = z.object({
  position: z.nativeEnum(Positions),
  multiplier: z.number().min(0).default(1.0)
})

// Schema atualizado para criação de temporada
const createSeasonSchema = z.object({
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

// GET - /api/season - get all seasons
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const seasons = await prismadb.season.findMany({
      include: {
        positionMultipliers: true,
        scores: true,
        histories: true
      }
    })

    return NextResponse.json({ data: seasons })
  } catch (error) {
    console.log(error)
    return new NextResponse('Error retrieving seasons', { status: 500 })
  }
}

// POST - /api/season - create season
export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const body = await req.json()
    const parsed = createSeasonSchema.safeParse(body)

    if (!parsed.success) {
      return new NextResponse('Invalid information provided', { status: 401 })
    }

    const { positionMultipliers, ...seasonData } = parsed.data

    // Criar a temporada
    const season = await prismadb.season.create({
      data: {
        ...seasonData
      }
    })

    // Criar os multiplicadores por posição
    if (positionMultipliers && positionMultipliers.length > 0) {
      await prismadb.positionMultiplier.createMany({
        data: positionMultipliers.map(pm => ({
          seasonId: season.id,
          position: pm.position,
          multiplier: pm.multiplier
        }))
      })
    } else {
      // Criar multiplicadores padrão para todas as posições
      const positions = Object.values(Positions)
      await prismadb.positionMultiplier.createMany({
        data: positions.map(position => ({
          seasonId: season.id,
          position,
          multiplier: 1.0 // Valor padrão
        }))
      })
    }

    // Buscar a temporada com os multiplicadores
    const seasonWithMultipliers = await prismadb.season.findUnique({
      where: { id: season.id },
      include: {
        positionMultipliers: true
      }
    })

    return NextResponse.json({
      data: seasonWithMultipliers,
      message: 'Season created successfully'
    })
  } catch (error) {
    console.log('[SEASON_POST_ERROR]', error)
    return new NextResponse('Error creating season', { status: 500 })
  }
}
