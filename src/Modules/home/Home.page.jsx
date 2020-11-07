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
import { SnackMessage } from 'Commons/message/Message.SnackMessage'
import { useHistory } from 'react-router-dom'
import { getCharImg } from 'Modules/character/Character.Helpers'

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
  const [toggleValues, setToggleValues] = useState({
    onlyFavorites: false,
    ordered: true,
  })
  const [snackProperties, setSnackProperties] = useState({
    open: false,
    msg: 'Só é possível ter no máximo 5 heróis favoritos!',
  })
  const [txtSearch, setTxtSearch] = useState('')
  const {
    characters,
    setCurrentCharacter,
    favorites,
    setFavorites,
  } = useCharacterStore()
  const history = useHistory()
  const favIds = favorites.map(fav => fav.id)

  const handleFavorite = char => {
    if (favorites.length === 5 && !favIds.includes(char.id)) {
      setSnackProperties({ ...snackProperties, open: true })
    } else if (favIds.includes(char.id)) {
      setFavorites([...favorites.filter(fav => fav.id != char.id)])
    } else setFavorites([...favorites, char])
  }

  const openCharacter = char => {
    setCurrentCharacter({ ...char })
    history.push(`/Heroi/${char.id}`)
  }

  const handleChange = e => setTxtSearch(e?.target?.value)

  const doSearch = async () => {
    const { onlyFavorites, ordered } = toggleValues
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
      <SnackMessage
        open={snackProperties.open}
        onClose={() => {
          setSnackProperties({ ...snackProperties, open: false })
        }}
      >
        {snackProperties.msg}
      </SnackMessage>
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
            isFavorite={favIds.includes(char.id)}
          />
        ))}
      </CharacterCardContainer>
      <Footer />
    </HomeContainer>
  )
}
