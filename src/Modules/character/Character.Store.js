import { create } from 'zustand'

export const [useCharacterStore] = create(set => ({
  characters: {},
  currentCharacter: {},
  favorites: (() => {
    const retrieveFav = [
      ...JSON.parse(localStorage.getItem('favorites') || '[]'),
    ]
    if (retrieveFav.length > 5) return []

    return retrieveFav
  })(),
  setFavorites: favorites => {
    set({ favorites })
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },
  setCharacters: characters => set({ characters }),
  setCurrentCharacter: currentCharacter => set({ currentCharacter }),
}))
