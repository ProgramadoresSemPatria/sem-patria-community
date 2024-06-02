import { create } from 'zustand'
import {
  type ChallengeSections,
  type ChecklistStore
} from '@/hooks/checklist/type'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mockData } from '@/hooks/checklist/mock/data'
import { formatISO } from 'date-fns'

const initialData: ChallengeSections = mockData

export const useChecklist = create(
  persist<ChecklistStore>(
    (set, get) => ({
      challenges: initialData,
      toggleComplete: (sectionName, itemId, checked) => {
        const updatedChallenges = get().challenges[sectionName].map(item =>
          item.id === itemId
            ? { ...item, updatedAt: formatISO(new Date()), completed: checked }
            : item
        )
        set({
          challenges: {
            ...get().challenges,
            [sectionName]: updatedChallenges
          }
        })
      }
    }),
    {
      name: 'checklist',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
