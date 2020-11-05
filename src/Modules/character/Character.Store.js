import { create } from 'zustand'

export const [useCharacterStore] = create(set => ({
  characters: {},
  setCharacters: characters => set({ characters }),
}))
