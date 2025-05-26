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

export type GetScoreboardByUserIdApiProps = {
  data: {
    userId: string
    points: number
    seasonId: string
  }
}
