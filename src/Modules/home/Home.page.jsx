import { useCharacterServices } from 'Modules/character/Character.Services'
import React, { useEffect } from 'react'
import styled from 'styled-components'

const HomeContainer = styled.div`
  text-align: center;
`

export const HomePage = () => {
  const { getCharacterList } = useCharacterServices()

  useEffect(() => {
    const fetchData = async () => getCharacterList()
    fetchData()
  }, [getCharacterList])

  return <HomeContainer>Home page</HomeContainer>
}
