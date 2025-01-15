export type LeaderboardUser = {
  name: string
  points: number
  username: string
  position: string
  mainRole: string
  avatarURL?: string
}

export type FilterLeaderboardData = (
  data: LeaderboardUser[],
  term: string
) => LeaderboardUser[]
