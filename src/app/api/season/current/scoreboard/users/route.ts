import { getSearchUsersInCurrentSeason } from '@/actions/leaderboard/get-leaderboard-users'
import { type NextRequest, NextResponse } from 'next/server'

// GET /api/season/current/scoreboard/users - Search users in current season
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchTerm = searchParams.get('search') || undefined

    const users = await getSearchUsersInCurrentSeason(searchTerm, 20)

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error searching users in current season:', error)
    return NextResponse.json(
      { error: 'Error searching users in current season' },
      { status: 500 }
    )
  }
}
