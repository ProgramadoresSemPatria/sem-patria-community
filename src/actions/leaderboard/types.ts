import { type Positions } from '@prisma/client'

export type SeasonMetadata = {
  awards?: Array<{
    position: string
    description: string
  }>
  description?: string
}

export type LeaderboardUser = {
  name: string
  username: string
  level: string | null
  position: Positions | null
  imageUrl?: string | null
}

export type LeaderboardScore = {
  id: string
  userId: string
  points: number
  seasonId: string
  user: LeaderboardUser
}

export type CurrentSeasonResponse = {
  id: string
  name: string
  initDate: Date
  endDate: Date
  isCurrent: boolean
  createdAt: Date
  updatedAt: Date
  metadata: SeasonMetadata | null
  scores: LeaderboardScore[]
} | null
