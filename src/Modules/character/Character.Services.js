import { useRequests } from 'Commons/requests/Requests.defaults'
import { useCharacterStore } from './Character.Store'
import { characterMockList } from './mocks/Character.Mock.List'

const apikey = 'ed55883a8d48462344e398744418175d'

export const useCharacterServices = () => {
  const axios = useRequests()
  const { setCharacters, favorites } = useCharacterStore()

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
    getCharacterList: getCharacterListMock,
  }
}
