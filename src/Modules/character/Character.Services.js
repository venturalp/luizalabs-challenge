import { useRequests } from 'Commons/requests/Requests.defaults'

const apikey = 'bfebc69598f56b24aab84757b97b497f'

export const useCharacterServices = () => {
  const axios = useRequests()

  const getCharacterList = () =>
    axios
      .get('https://gateway.marvel.com/v1/public/characters', {
        params: {
          apikey,
        },
      })
      .then(response => console.log('response api', response))
      .catch(err => console.log('err api', err))

  return {
    getCharacterList,
  }
}
