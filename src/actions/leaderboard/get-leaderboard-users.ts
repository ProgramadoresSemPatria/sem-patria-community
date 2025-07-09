import prismadb from '@/lib/prismadb'
import type { Prisma } from '@prisma/client'
import { type LeaderboardScore, type SearchedUserProps } from './types'

export interface SearchUserInCurrentSeasonProps {
  userId: string
  points: number
  user: {
    id: string
    name: string
    username: string
    level: string
    position: string | null
    imageUrl: string | null
  }
}

export interface SearchUsersInCurrentSeasonResponse {
  users: SearchUserInCurrentSeasonProps[]
}

export async function getLeaderboardUsers(
  page: number = 0,
  pageSize: number = 10
): Promise<SearchedUserProps[]> {
  try {
    const currentSeason = await prismadb.season.findFirst({
      where: { isCurrent: true },
      select: { id: true }
    })

    if (!currentSeason) {
      return []
    }

    const queryOptions: Prisma.ScoreboardFindManyArgs = {
      where: {
        seasonId: currentSeason.id
      },
      orderBy: [{ points: 'desc' }, { userId: 'asc' }],
      skip: page * pageSize,
      take: pageSize,
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
    }

    const scoreboardEntries = (await prismadb.scoreboard.findMany(
      queryOptions
    )) as LeaderboardScore[]

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

export async function getSearchUsersInCurrentSeason(
  searchTerm?: string,
  limit: number = 20
): Promise<SearchUserInCurrentSeasonProps[]> {
  try {
    if (!searchTerm) {
      return []
    }

    const currentSeason = await prismadb.season.findFirst({
      where: { isCurrent: true },
      select: { id: true }
    })

    if (!currentSeason) {
      return []
    }

    const where: Prisma.UserWhereInput = {
      OR: [
        { name: { contains: searchTerm, mode: 'insensitive' } },
        { username: { contains: searchTerm, mode: 'insensitive' } }
      ]
    }

    const users = await prismadb.user.findMany({
      where,
      orderBy: { name: 'asc' },
      take: limit,
      select: {
        id: true,
        name: true,
        username: true,
        level: true,
        position: true,
        imageUrl: true,
        Scoreboard: {
          where: {
            seasonId: currentSeason.id
          },
          select: {
            points: true
          }
        }
      }
    })

    const usersWithScores = await Promise.all(
      users.map(async user => {
        let points = 0

        if (user.Scoreboard.length > 0) {
          points = user.Scoreboard[0].points
        } else {
          await prismadb.scoreboard.create({
            data: {
              userId: user.id,
              seasonId: currentSeason.id,
              points: 0
            }
          })
        }

        return {
          userId: user.id,
          points,
          user: {
            id: user.id,
            name: user.name,
            username: user.username,
            level: user.level || '',
            position: user.position || null,
            imageUrl: user.imageUrl || null
          }
        }
      })
    )

    return usersWithScores
  } catch (error) {
    console.error('Error searching users in current season:', error)
    return []
  }
}
