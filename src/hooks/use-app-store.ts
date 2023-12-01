import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  isCmsMode: boolean
}

type Actions = {
  setCmsMode: (isCmsMode: boolean) => void
}

export const useAppStore = create(
  persist<State & Actions>(
    (set, get) => ({
      isCmsMode: false,
      setCmsMode: isCmsMode => {
        if (get().isCmsMode !== isCmsMode) {
          set({ isCmsMode })
        }
      }
    }),
    {
      name: 'app-mode',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
