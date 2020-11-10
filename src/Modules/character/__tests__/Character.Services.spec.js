const { renderHook, act } = require('@testing-library/react-hooks')
const { server, rest } = require('Commons/tests/Tests.MockServer')
const { useCharacterServices } = require('../Character.Services')

describe('test Character services', () => {
  it('test getCharacterInfo error', async () => {
    const { result: charService } = renderHook(() => useCharacterServices())
    server.use(
      rest.get(
        'https://gateway.marvel.com/v1/public/characters/1017100',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    )
    let response
    await act(async () => {
      response = await charService.current.getCharacterInfo(1017100)
    })

    expect(response).toMatchObject({
      success: false,
      msg: 'Não foi possível consultar personagem!',
    })
  })
  it('test getCharacterComics error', async () => {
    const { result: charService } = renderHook(() => useCharacterServices())
    server.use(
      rest.get(
        'https://gateway.marvel.com/v1/public/characters/1017100/comics?limit=10&orderBy=-onsaleDate',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    )
    let response
    await act(async () => {
      response = await charService.current.getCharacterComics(1017100)
    })

    expect(response).toMatchObject({
      success: false,
      msg: 'Não foi possível consultar quadrinhos do personagem!',
    })
  })
  it('test getCharacterList error', async () => {
    const { result: charService } = renderHook(() => useCharacterServices())
    server.use(
      rest.get(
        'https://gateway.marvel.com/v1/public/characters?limit=20',
        (req, res, ctx) => res(ctx.status(400)),
      ),
    )
    let response
    await act(async () => {
      response = await charService.current.getCharacterList()
    })

    expect(response).toMatchObject({
      success: false,
      msg: 'Não foi possível consultar personagens!',
    })
  })
})
