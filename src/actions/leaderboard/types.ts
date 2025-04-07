import { type Positions } from '@prisma/client'

export type SeasonMetadata = {
  awards?: Array<{
    position: string
    description: string
  }>
  description?: string
}

export type LeaderboardUser = {
  id: string
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

export interface SearchedUserProps {
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

export interface SearchUsersResponse {
  users: SearchedUserProps[]
}
