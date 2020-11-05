import { ResponsiveImage } from 'Commons/images/Images.ResponsiveImage'
import { useCharacterServices } from 'Modules/character/Character.Services'
import { useCharacterStore } from 'Modules/character/Character.Store'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LogoSmall from 'Assets/logo.png'
import Logo from 'Assets/logo2x.png'
import { SearchBar } from 'Commons/form/Form.SearchBar'
import { Toggle } from 'Commons/form/Form.Toggle'
import { CharacterCard } from 'Modules/character/Character.Card'

const logoImgQueries = [
  {
    img: LogoSmall,
    size: 0,
  },
  {
    img: Logo,
    size: 700,
  },
]

const HomeContainer = styled.div`
  text-align: center;
`

const HeaderHome = styled.div`
  max-width: 80%;
  width: 1024px;
  margin: 0 auto 45px;
  & p {
    margin-bottom: 45px;
  }
`

const CharacterCardStyled = styled(CharacterCard)`
  width: ${props => `${props.width}px`};
`

export const HomePage = () => {
  const { getCharacterList } = useCharacterServices()
  const { characters } = useCharacterStore()
  const [cardSize, setCardSize] = useState(200)

  useEffect(() => {
    const fetchData = async () => getCharacterList()
    fetchData()
  }, [])

  return (
    <HomeContainer>
      <ResponsiveImage queries={logoImgQueries} />
      <HeaderHome>
        <h1>EXPLORE O UNIVERSO</h1>
        <p>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </p>
        <SearchBar fullWidth />
      </HeaderHome>
      <Toggle />
      <CharacterCardStyled
        name="teste"
        onFavorite={e => {
          console.log(e)
          setCardSize(cardSize * 1.1)
        }}
        img="https://picsum.photos/200"
        width={cardSize}
      />
      {JSON.stringify(characters)}
    </HomeContainer>
  )
}
