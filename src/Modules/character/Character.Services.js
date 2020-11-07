import { useRequests } from 'Commons/requests/Requests.defaults'
import { useCharacterStore } from './Character.Store'
import {
  characterMockList,
  characterMock,
  characterComicsMock,
} from './mocks/Character.Mock'

const apikey = 'ed55883a8d48462344e398744418175d'

export const useCharacterServices = () => {
  const axios = useRequests()
  const {
    setCharacters,
    favorites,
    setCurrentCharacter,
    setCurrentCharacterComics,
  } = useCharacterStore()

  const filterCharacterList = (data, onlyFavorites) => {
    if (onlyFavorites) {
      const listFav = data.results.filter(char => favorites.includes(char.id))

      return {
        list: [...listFav],
        pageInfo: {
          count: listFav.length,
          limit: 5,
          total: listFav.length,
          offset: 5,
        },
      }
    }

    return {
      list: [...data.results],
      pageInfo: {
        count: data.count,
        limit: data.limit,
        total: data.total,
        offset: data.offset,
      },
    }
  }

  const getCharacterListMock = () => {
    setCharacters({
      list: [...characterMockList.data.results],
      pageInfo: {
        count: characterMockList.data.count,
        limit: characterMockList.data.limit,
        offset: characterMockList.data.offset,
        total: characterMockList.data.total,
      },
    })

    return { success: true }
  }

  const getCharacterInfoMock = () => {
    setCurrentCharacter({
      ...characterMock?.data?.results?.[0],
    })

    return { success: true }
  }

  const getCharacterComicsMock = () => {
    setCurrentCharacterComics({
      ...characterComicsMock?.data?.results,
    })

    return { success: true }
  }

  const getCharacterInfo = id =>
    axios
      .get(`https://gateway.marvel.com/v1/public/characters/${id}`, {
        showLoading: true,
        params: { apikey },
      })
      .then(response => {
        setCurrentCharacter({ ...response?.data?.data?.results?.[0] })

        return { success: true }
      })
      .catch(() => ({
        success: false,
        msg: 'Não foi possível consultar personagem!',
      }))

  const getCharacterComics = id =>
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${id}/comics?limit=10&orderBy=-onsaleDate`,
        {
          showLoading: true,
          params: { apikey },
        },
      )
      .then(response => {
        setCurrentCharacterComics([...response?.data?.data?.results])

        return { success: true }
      })
      .catch(() => ({
        success: false,
        msg: 'Não foi possível consultar quadrinhos do personagem!',
      }))

  const getCharacterList = ({ txtSearch, onlyFavorites, ordered } = {}) => {
    const params = { apikey }
    if (txtSearch) params.nameStartsWith = txtSearch
    params.orderBy = `${ordered ? '' : '-'}name`

    return axios
      .get('https://gateway.marvel.com/v1/public/characters?limit=20', {
        params,
        showLoading: true,
      })
      .then(response => {
        const data = { ...response.data.data }
        setCharacters({ ...filterCharacterList(data, onlyFavorites) })

        return { success: true }
      })
      .catch(() => ({
        success: false,
        msg: 'Não foi possível consultar personagens!',
      }))
  }

  return {
    getCharacterList, // : getCharacterListMock,
    getCharacterInfo, // : getCharacterInfoMock,
    getCharacterComics, // : getCharacterComicsMock,
  }
}
