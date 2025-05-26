import type { JsonValue } from '@prisma/client/runtime/library'

export type ScoreHistoryActivity = {
  id: string
  points: number
  date: string
  source: {
    type: string
    baseScore: number
  }
  multiplier: number
  user: {
    id: string
    name: string
    username: string
    imageUrl?: string
  }
  season: {
    name: string
    isCurrent: boolean
  }
}

export type GetScoreHistoryByUserIdApiProps = {
  data: {
    userId: string
    activities: ScoreHistoryActivity[]
  }
}

export type ScoreHistoryItem = {
  id: string
  points: number
  multiplier: number
  createdAt: string
  isManual: boolean
  user: {
    id: string
    name: string
    imageUrl?: string | null
    username: string
  }
  target: {
    id: string
    name: string
    imageUrl?: string | null
    username: string
  } | null
  resource: {
    id: string
    resource: string
    baseScore: number
  }
  season: {
    id: string
    name: string
  }
  metadata?: JsonValue
}

export type GetScoreHistoryBySeasonProps = {
  seasonId: string
  limit?: number
  cursor?: string
}

export type GetScoreHistoryBySeasonApiProps = {
  data: ScoreHistoryItem[]
  nextCursor: string | null
}

export type GetScoreHistoryBySeasonResult = {
  pages: GetScoreHistoryBySeasonApiProps[]
  pageParams: Array<string | null>
}
