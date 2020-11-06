import { ResponsiveImage } from 'Commons/images/Images.ResponsiveImage'
import { useCharacterServices } from 'Modules/character/Character.Services'
import { useCharacterStore } from 'Modules/character/Character.Store'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import LogoSmall from 'Assets/logo.png'
import Logo from 'Assets/logo2x.png'
import { SearchBar } from 'Commons/form/Form.SearchBar'
import { Toggle } from 'Commons/form/Form.Toggle'
import { CharacterCard } from 'Modules/character/Character.Card'
import { CharacterFilter } from 'Modules/character/Character.Filter'
import { Grid } from 'Commons/container/Container.Grid'

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

const FilterContainer = styled(CharacterFilter)`
  max-width: 95%;
  width: 1100px;
  margin: 60px auto 25px;
`

const Footer = styled.footer`
  height: 60px;
  background-color: ${props => props.theme.mainColor};
`

const CharacterCardContainer = styled.div`
  max-width: 95%;
  width: 1100px;
  margin: 0 auto 120px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 35px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const HomePage = () => {
  const { getCharacterList } = useCharacterServices()
  const { characters } = useCharacterStore()

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
      <FilterContainer total={characters?.pageInfo?.total} />
      <CharacterCardContainer>
        {characters?.list?.map(char => (
          <CharacterCard
            className="character-card"
            name={char.name}
            key={char.name}
            onFavorite={e => {
              console.log(e)
            }}
            img={`${char?.thumbnail?.path}.${char?.thumbnail?.extension}`}
          />
        ))}
      </CharacterCardContainer>
      <Footer />
    </HomeContainer>
  )
}
