import { create } from 'zustand'

export const [useApplicationStore] = create(set => ({
  isLoading: false,
  setIsLoading: value => set({ isLoading: value }),
  snackProperties: {
    open: false,
    msg: '',
    time: 4000,
  },
  setSnackProperties: snackProperties => set({ snackProperties }),
}))
