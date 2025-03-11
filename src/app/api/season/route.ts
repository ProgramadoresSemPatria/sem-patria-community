import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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
  })
})
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

    const { ...seasonData } = parsed.data

    const season = await prismadb.season.create({
      data: {
        ...seasonData
      }
    })

    return NextResponse.json({
      data: {
        ...season
      },
      message: 'Season created successfully'
    })
  } catch (error) {
    return new NextResponse('Error creating season', { status: 500 })
  }
}
// GET - /api/season - get all seasons
export async function GET(req: NextRequest) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 })
    }

    const seasons = await prismadb.season.findMany()

    return NextResponse.json(seasons)
  } catch (error) {
    console.log(error)
    return new NextResponse('Error retrieving seasons', { status: 500 })
  }
}
