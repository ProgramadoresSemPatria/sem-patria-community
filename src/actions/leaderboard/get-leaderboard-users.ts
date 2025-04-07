import prismadb from '@/lib/prismadb'
import { type SearchedUserProps } from './types'

export async function getLeaderboardUsers(
  searchTerm?: string
): Promise<SearchedUserProps[]> {
  try {
    // Buscar a temporada atual
    const currentSeason = await prismadb.season.findFirst({
      where: { isCurrent: true },
      select: { id: true }
    })

    if (!currentSeason) {
      return []
    }

    // Buscar usuários com base no termo de pesquisa
    const scoreboardEntries = await prismadb.scoreboard.findMany({
      where: {
        seasonId: currentSeason.id,
        user: searchTerm
          ? {
              OR: [
                { name: { contains: searchTerm, mode: 'insensitive' } },
                { username: { contains: searchTerm, mode: 'insensitive' } }
              ]
            }
          : undefined
      },
      orderBy: {
        points: 'desc'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            level: true,
            position: true,
            imageUrl: true
          }
        }
      }
    })

    return scoreboardEntries.map(entry => ({
      userId: entry.user.id,
      points: entry.points,
      user: {
        id: entry.user.id,
        name: entry.user.name,
        username: entry.user.username,
        level: entry.user.level || '',
        position: entry.user.position || null,
        imageUrl: entry.user.imageUrl || null
      }
    }))
  } catch (error) {
    console.error('Error fetching leaderboard users:', error)
    return []
  }
}
