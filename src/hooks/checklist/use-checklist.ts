import { create } from 'zustand'
import {
  type ChallengeSections,
  type ChecklistStore
} from '@/hooks/checklist/type'
import { createJSONStorage, persist } from 'zustand/middleware'
import mockData from '@/hooks/checklist/mock/data.json'

const initialData: ChallengeSections = mockData

export const useChecklist = create(
  persist<ChecklistStore>(
    (set, get) => ({
      challenges: initialData,
      toggleComplete: (sectionName, itemId, checked) => {
        // TODO:
        console.log(sectionName, itemId, checked)
      }
    }),
    {
      name: 'checklist',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
