import { useRequests } from 'Commons/requests/Requests.defaults'
import { useCharacterStore } from './Character.Store'

const apikey = 'bfebc69598f56b24aab84757b97b497f'

export const useCharacterServices = () => {
  const axios = useRequests()
  const { setCharacters } = useCharacterStore()

  const getCharacterList = () =>
    axios
      .get('http://gateway.marvel.com/v1/public/characters', {
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
    getCharacterList,
  }
}
