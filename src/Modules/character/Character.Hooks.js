import { useApplicationStore } from 'Modules/application/Application.Store'
import { useEffect, useState } from 'react'
import { useCharacterStore } from './Character.Store'

export const useFavorites = () => {
  const { favorites, setFavorites } = useCharacterStore()

  const { setSnackProperties } = useApplicationStore()

  const [favIds, setFavIds] = useState(favorites.map(fav => fav.id))

  const handleFavorite = char => {
    if (favorites.length === 5 && !favIds.includes(char.id)) {
      setSnackProperties({
        open: true,
        msg: 'Só é possível ter no máximo 5 heróis favoritos!',
      })
    } else if (favIds.includes(char.id)) {
      setFavorites([...favorites.filter(fav => fav.id != char.id)])
    } else setFavorites([...favorites, char])
  }

  const isFavorite = id => favIds.includes(id)

  useEffect(() => {
    setFavIds(favorites.map(fav => fav.id))
  }, [favorites])

  return {
    handleFavorite,
    isFavorite,
  }
}
