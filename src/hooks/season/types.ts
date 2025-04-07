import type { JsonValue } from '@prisma/client/runtime/library'

export type GetCurrentSeasonApiProps = {
  id: string
  name: string
  startDate: string
  endDate: string
  scores: Array<{
    id: string
    createdAt: Date
    metadata: JsonValue | null
    seasonId: string
    points: number
  }>
  metadata: {
    description: string
    awards: Array<{
      position: string
      description: string
    }>
  }
}

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
