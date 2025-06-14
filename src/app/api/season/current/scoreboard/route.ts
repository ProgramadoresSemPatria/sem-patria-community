import { getLeaderboardUsers } from '@/actions/leaderboard/get-leaderboard-users'
import { type NextRequest, NextResponse } from 'next/server'

// GET /api/season/current/scoreboard - Get leaderboard users with pagination
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '0')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    const users = await getLeaderboardUsers(page, pageSize)

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error fetching leaderboard users:', error)
    return NextResponse.json(
      { error: 'Error fetching leaderboard users' },
      { status: 500 }
    )
  }
}
