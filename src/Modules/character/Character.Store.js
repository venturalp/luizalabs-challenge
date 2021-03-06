import { create } from 'zustand'

export const [useCharacterStore] = create(set => ({
  characters: {},
  currentCharacter: null,
  currentCharacterComics: null,
  favorites: (() => {
    const retrieveFav = [
      ...JSON.parse(localStorage.getItem('favorites') || '[]'),
    ]

    return retrieveFav
  })(),
  setFavorites: favorites => {
    set({ favorites })
    localStorage.setItem('favorites', JSON.stringify(favorites))
  },
  setCharacters: characters => set({ characters }),
  setCurrentCharacter: currentCharacter => set({ currentCharacter }),
  setCurrentCharacterComics: currentCharacterComics =>
    set({ currentCharacterComics }),
}))
