import { getLeaderboardUsers } from '@/actions/leaderboard/get-leaderboard-users'
import { type NextRequest, NextResponse } from 'next/server'

// GET /api/season/current/scoreboard - Search leaderboard users
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const searchTerm = searchParams.get('search') || undefined
    const page = parseInt(searchParams.get('page') || '0')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')

    const users = await getLeaderboardUsers(searchTerm, page, pageSize)

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error searching leaderboard users:', error)
    return NextResponse.json(
      { error: 'Error searching leaderboard users' },
      { status: 500 }
    )
  }
}
