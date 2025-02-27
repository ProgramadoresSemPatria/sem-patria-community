import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// GET - /api/scoreboard - get scoreboard of all users
export async function GET() {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

    const scoreboard = await prismadb.scoreboard.findMany({
      select: {
        user: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            username: true
          }
        },
        id: true,
        points: true,
        seasonId: true
      },
      orderBy: {
        points: 'desc'
      }
    })

    return NextResponse.json({
      data: {
        ...scoreboard
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao obter scoreboard' },
      { status: 500 }
    )
  }
}
