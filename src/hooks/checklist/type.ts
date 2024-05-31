import { type CheckedState } from '@radix-ui/react-checkbox'

export interface ChallengeItem {
  id: string
  title: string
  completed: boolean
  updatedAt: string
}

export interface ChallengeSections {
  weekly: ChallengeItem[]
  daily: ChallengeItem[]
  monthly: ChallengeItem[]
  uniqueActions: ChallengeItem[]
}

export interface ChecklistStore {
  challenges: ChallengeSections
  toggleComplete: (
    sectionName: keyof ChallengeSections,
    itemId: ChallengeItem['id'],
    checked: CheckedState
  ) => void
}
