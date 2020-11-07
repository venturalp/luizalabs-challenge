import { StarProgress } from 'Commons/review/Review.StarProgress'
import React, { useEffect, useState, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled, { withTheme } from 'styled-components'
import { useCharacterServices } from './Character.Services'
import { useCharacterStore } from './Character.Store'
import LogoSmall from 'Assets/logo.png'
import Book from 'Assets/book.png'
import Video from 'Assets/video.png'
import { SearchBar } from 'Commons/form/Form.SearchBar'
import { Grid } from 'Commons/container/Container.Grid'
import { Toggle } from 'Commons/form/Form.Toggle'
import { getCharImg } from './Character.Helpers'

const CharacterPageContainer = styled.div`
  background-color: ${props => props.theme.backgroundDetail};
  height: 100%;
  & h5 {
    font-weight: 500;
    margin-right: 12px;
  }
`

const CharacterPageHeader = styled.form`
  max-width: 100%;
  width: 1100px;
  margin: 0 auto;
  padding-top: 30px;
  text-align: center;
  & .search-bar {
    max-width: 90%;
  }
  img {
    max-width: 90%;
  }
  @media (min-width: 768px) {
    padding-right: 10%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    & img {
      margin-right: 30px;
    }
  }
`

const CharacterInfoContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  width: 1024px;
  display: flex;
  padding-top: 60px;
  flex-direction: column-reverse;
  & p {
    font-size: ${props => props.theme.pxToRem(13)};
  }
  & .description {
    color: ${props => props.theme.textMid};
    font-size: ${props => props.theme.pxToRem(18)};
    line-height: ${props => props.theme.pxToRem(30)};
    margin: 30px 0;
  }
  & h1 {
    font-size: ${props => props.theme.pxToRem(18)};
  }
  & > div > {
    img {
      max-width: 100%;
    }
  }
  @media (min-width: 768px) {
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    & > div {
      &:first-child {
        padding-right: 12%;
        width: 45%;
      }
      &:last-child {
        width: 55%;
      }
    }
  }
`

const InfoBlock = styled.div`
  &:first-child {
    margin-right: 20%;
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 8px;
    & img {
      margin-right: 12px;
    }
  }
`

export const CharacterPage = withTheme(({ theme }) => {
  const params = useParams()
  const history = useHistory()
  const {
    currentCharacter,
    currentCharacterComics,
    favorites,
  } = useCharacterStore()
  const { getCharacterInfo, getCharacterComics } = useCharacterServices()
  const [txtSearch, setTxtSearch] = useState('')
  console.log('currentCharacterComics', currentCharacterComics)

  const getLastComicDate = () =>
    Intl.DateTimeFormat('pt-BR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(
      new Date(
        currentCharacterComics?.[0]?.dates?.[0]?.date?.substr(0, 10) || null,
      ),
    )
  const handleSubmit = e => {
    e.preventDefault()
    history.push(`/?q=${txtSearch}`)
  }

  const onFavorite = e => {
    console.log('onFavorite', e)
  }

  useEffect(() => {
    if (!currentCharacter) getCharacterInfo(params.id)
    if (!currentCharacterComics) getCharacterComics(params.id)
    global.document.body.style.backgroundColor = theme.backgroundDetail

    return () => (global.document.body.style.backgroundColor = 'inherit')
  }, [])

  return (
    <CharacterPageContainer>
      <CharacterPageHeader onSubmit={handleSubmit}>
        <img src={LogoSmall} alt="Logo" />
        <SearchBar
          inside
          className="search-bar"
          value={txtSearch}
          onChange={e => setTxtSearch(e?.target?.value)}
        />
      </CharacterPageHeader>
      <CharacterInfoContainer>
        <div className="info-body">
          <Grid justify="space-between" always>
            <h1>{currentCharacter?.name}</h1>
            <Toggle
              onChange={onFavorite}
              value={favorites.includes(currentCharacter?.id)}
            />
          </Grid>
          <p className="description">{currentCharacter?.description}</p>
          <Grid style={{ paddingRight: '30px' }} always>
            <InfoBlock>
              <h5>Quadrinhos</h5>
              <div>
                <img src={Book} alt="quadrinhos" />
                {currentCharacter?.comics?.items?.length}
              </div>
            </InfoBlock>
            <InfoBlock>
              <h5>Filmes</h5>
              <div>
                <img src={Video} alt="filmes" />
                {currentCharacter?.series?.items?.length}
              </div>
            </InfoBlock>
          </Grid>
          <br />
          <br />
          {useMemo(
            () => (
              <Grid justify="flex-start" always>
                <h5>Rating:</h5>
                <StarProgress />
              </Grid>
            ),
            [],
          )}
          <br />
          <br />
          <Grid justify="flex-start" always>
            <h5>Último quadrinho: </h5>
            <p>{getLastComicDate()}</p>
          </Grid>
        </div>
        <div>
          <img
            src={currentCharacter && getCharImg(currentCharacter)}
            alt={currentCharacter?.name}
          />
        </div>
      </CharacterInfoContainer>
    </CharacterPageContainer>
  )
})
