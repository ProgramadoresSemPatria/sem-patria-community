export interface ChallengeItem {
  id: string
  title: string
  completed: boolean
  updatedAt?: string
}

export interface ChallengeSections {
  weekly: ChallengeItem[]
  daily: ChallengeItem[]
  monthly: ChallengeItem[]
  uniqueActions: ChallengeItem[]
}

export interface ChecklistStore {
  challenges: ChallengeSections
  setChallenges: (challenges: ChallengeSections) => void
}
