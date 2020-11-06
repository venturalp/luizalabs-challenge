import { useRequests } from 'Commons/requests/Requests.defaults'
import { useCharacterStore } from './Character.Store'
import { characterMockList } from './mocks/Character.Mock.List'

const apikey = 'ed55883a8d48462344e398744418175d'

export const useCharacterServices = () => {
  const axios = useRequests()
  const { setCharacters } = useCharacterStore()

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

  const getCharacterList = () =>
    axios
      .get('https://gateway.marvel.com/v1/public/characters?limit=20', {
        params: {
          apikey,
        },
      })
      .then(response => {
        const data = { ...response.data.data }
        setCharacters({
          list: [...data.results],
          pageInfo: {
            count: data.count,
            limit: data.limit,
            total: data.total,
            offset: data.offset,
          },
        })

        return { success: true }
      })
      .catch(() => ({
        success: false,
        msg: 'Não foi possível consultar personagens!',
      }))

  return {
    getCharacterList: getCharacterListMock,
  }
}
