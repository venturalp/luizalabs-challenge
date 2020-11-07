import React, { useEffect } from 'react'

import { useParams } from 'react-router-dom'
import { useCharacterServices } from './Character.Services'
import { useCharacterStore } from './Character.Store'

export const CharacterPage = () => {
  const params = useParams()
  const { currentCharacter, currentCharacterComics } = useCharacterStore()
  const { getCharacterInfo, getCharacterComics } = useCharacterServices()
  console.log('params', params)
  console.log('currentCharacter', currentCharacter)
  console.log('currentCharacterComics', currentCharacterComics)

  useEffect(() => {
    if (!currentCharacter) getCharacterInfo(params.id)
    if (!currentCharacterComics) getCharacterComics(params.id)
  }, [])

  return <div>char page</div>
}
