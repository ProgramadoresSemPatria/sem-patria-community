import { getCurrentSeason } from '@/actions/leaderboard/get-current-season'
import { NextResponse } from 'next/server'

// GET /api/season/current - Get current season
export async function GET() {
  try {
    const currentSeason = await getCurrentSeason()

    if (!currentSeason) {
      return NextResponse.json(
        { error: 'No active season found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ ...currentSeason })
  } catch (error) {
    console.error('Error fetching current season:', error)
    return NextResponse.json(
      { error: 'Error fetching current season' },
      { status: 500 }
    )
  }
}
