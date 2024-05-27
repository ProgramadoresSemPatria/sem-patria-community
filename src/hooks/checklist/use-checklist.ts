import { create } from 'zustand'
import {
  type ChallengeSections,
  type ChecklistStore
} from '@/hooks/checklist/type'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mockData } from '@/hooks/checklist/mock/data'

const initialData: ChallengeSections = mockData

export const useChecklist = create(
  persist<ChecklistStore>(
    (set, get) => ({
      challenges: initialData,
      toggleComplete: (sectionName, itemId, checked) => {
        set(state => ({
          challenges: {
            ...state.challenges,
            [sectionName]: {
              ...state.challenges[sectionName],
              [itemId]: checked
            }
          }
        }))
        console.log(sectionName, itemId, checked)
      }
    }),
    {
      name: 'checklist',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
