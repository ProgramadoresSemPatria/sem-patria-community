import { create } from 'zustand'
import {
  type ChallengeSections,
  type ChecklistStore
} from '@/hooks/checklist/type'
import mockData from '@/hooks/checklist/mock/data.json'

const initialData: ChallengeSections = mockData

export const useChecklist = create<ChecklistStore>(set => ({
  challenges: initialData,
  setChallenges: challenges => {
    set({ challenges })
  }
}))
