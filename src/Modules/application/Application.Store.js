import { create } from 'zustand'

export const [useApplicationStore] = create(set => ({
  isLoading: false,
  setIsLoading: value => set({ isLoading: value }),
}))
