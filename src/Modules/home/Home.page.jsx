import { ResponsiveImage } from 'Commons/images/Images.ResponsiveImage'
import { useCharacterServices } from 'Modules/character/Character.Services'
import { useCharacterStore } from 'Modules/character/Character.Store'
import React, { useEffect, useState } from 'react'

import LogoSmall from 'Assets/logo.png'
import Logo from 'Assets/logo2x.png'
import { SearchBar } from 'Commons/form/Form.SearchBar'

import { CharacterCard } from 'Modules/character/Character.Card'

import {
  CharacterCardContainer,
  FilterContainer,
  Footer,
  HeaderHome,
  HomeContainer,
} from './Home.styles'

import { useHistory } from 'react-router-dom'
import { getCharImg } from 'Modules/character/Character.Helpers'
import { useFavorites } from 'Modules/character/Character.Hooks'
import { getQueryParam } from 'Modules/router/Router.Helpers'

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

export const HomePage = () => {
  const { getCharacterList } = useCharacterServices()
  const { handleFavorite, isFavorite } = useFavorites()
  const history = useHistory()
  const [toggleValues, setToggleValues] = useState({
    onlyFavorites: false,
    ordered: true,
  })
  const [txtSearch, setTxtSearch] = useState(
    getQueryParam(history.location.search, 'q') || '',
  )
  const { characters, setCurrentCharacter } = useCharacterStore()

  const openCharacter = char => {
    setCurrentCharacter({ ...char })
    history.push(`/Heroi/${char.id}`)
  }

  const handleChange = e => setTxtSearch(e?.target?.value)

  const doSearch = async () => {
    const { onlyFavorites, ordered } = toggleValues
    console.log(txtSearch)
    await getCharacterList({ txtSearch, onlyFavorites, ordered })
  }

  const updateToggle = name => {
    setToggleValues({ ...toggleValues, [name]: !toggleValues[name] })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    await doSearch()
  }

  useEffect(() => {
    doSearch()
  }, [toggleValues.ordered, toggleValues.onlyFavorites])

  useEffect(() => {
    setCurrentCharacter(null)
    doSearch()
  }, [])

  return (
    <HomeContainer>
      <ResponsiveImage queries={logoImgQueries} />
      <HeaderHome onSubmit={handleSubmit}>
        <h1>EXPLORE O UNIVERSO</h1>
        <p>
          Mergulhe no domínio deslumbrante de todos os personagens clássicos que
          você ama - e aqueles que você descobrirá em breve!
        </p>
        <SearchBar
          fullWidth
          value={txtSearch}
          onChange={handleChange}
          name="searchBar"
          autoComplete="off"
        />
      </HeaderHome>
      <FilterContainer
        total={characters?.pageInfo?.total}
        onFavorites={() => updateToggle('onlyFavorites')}
        onOrder={() => updateToggle('ordered')}
        onlyFavorites={toggleValues.onlyFavorites}
        ordered={toggleValues.ordered}
      />
      <CharacterCardContainer>
        {characters?.list?.map(char => (
          <CharacterCard
            className="character-card"
            name={char.name}
            key={char.name}
            onClick={() => openCharacter(char)}
            onFavorite={() => handleFavorite(char)}
            img={getCharImg(char)}
            id={char.id}
            isFavorite={isFavorite(char.id)}
          />
        ))}
      </CharacterCardContainer>
      <Footer />
    </HomeContainer>
  )
}
