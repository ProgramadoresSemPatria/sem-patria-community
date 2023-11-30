import { create } from 'zustand'

type State = {
  isCmsMode: boolean
}

type Actions = {
  setCmsMode: (isCmsMode: boolean) => void
}

export const useAppStore = create<State & Actions>(set => ({
  isCmsMode: false,
  setCmsMode: isCmsMode => set({ isCmsMode })
}))
