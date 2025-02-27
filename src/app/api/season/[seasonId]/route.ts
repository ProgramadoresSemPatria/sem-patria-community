import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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
  })
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

    const { ...seasonData } = parsed.data

    await prismadb.season.update({
      where: {
        id: params.seasonId
      },
      data: {
        ...seasonData
      }
    })

    return NextResponse.json({
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
