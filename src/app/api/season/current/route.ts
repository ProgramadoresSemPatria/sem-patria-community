import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

// GET /api/season/current - Get current season
export async function GET() {
  try {
    const currentSeason = await prisma.season.findFirst({
      where: { isCurrent: true },
      include: {
        positionMultipliers: true
      }
    })

    if (!currentSeason) {
      return NextResponse.json(
        { error: 'No active season found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: currentSeason })
  } catch (error) {
    console.error('Error fetching current season:', error)
    return NextResponse.json(
      { error: 'Error fetching current season' },
      { status: 500 }
    )
  }
}
