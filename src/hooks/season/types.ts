import type {
  CurrentSeasonResponse,
  SearchUsersResponse
} from '@/actions/leaderboard/types'
import type { JsonValue } from '@prisma/client/runtime/library'

export type GetCurrentSeasonApiProps = CurrentSeasonResponse

export type GetAllSeasonsApiProps = {
  data: Array<{
    name: string
    id: string
    createdAt: Date
    initDate: Date
    endDate: Date
    isCurrent: boolean
    updatedAt: Date
    metadata: JsonValue | null
    histories: Array<{
      id: string
      createdAt: Date
      metadata: JsonValue | null
      seasonId: string
      multiplier: number
      points: number
      userId: string
      targetId: string | null
      resourceId: string
      isManual: boolean
    }>
    scores: Array<{
      id: string
      createdAt: Date
      metadata: JsonValue | null
      seasonId: string
      points: number
    }>
    positionMultipliers: Array<{
      id: string
      createdAt: Date
      metadata: JsonValue | null
      seasonId: string
      multiplier: number
    }>
  }>
}

export type SearchLeaderboardUsersApiProps = SearchUsersResponse
