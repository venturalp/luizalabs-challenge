import { screen, waitFor } from '@testing-library/dom'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import {
  renderWithRouter,
  sleepTest,
  ThemeWrapper,
} from 'Commons/tests/Tests.Helpers'
import { rest, server } from 'Commons/tests/Tests.MockServer'
import {
  characterMockList,
  characterMockListSearch,
} from 'Modules/character/mocks/Character.Mock'
import { HomePage } from 'Modules/home/Home.page'
import React from 'react'
import { useHistory } from 'react-router-dom'

beforeEach(() => {
  global.window.localStorage.removeItem('favorites')
})

describe('test home page', () => {
  it('test check favorites', async () => {
    renderWithRouter(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let favorites
    await waitFor(
      async () => (favorites = await screen.queryAllByTestId('toggleFavorite')),
    )

    expect(global.window.localStorage.getItem('favorites')).toBeNull()
    userEvent.click(favorites[0])
    expect(global.window.localStorage.getItem('favorites')).toEqual(
      JSON.stringify([characterMockList.data.results[0]]),
    )
    userEvent.click(favorites[0])
    expect(global.window.localStorage.getItem('favorites')).toEqual('[]')
  })
  it('test only favorites', async () => {
    renderWithRouter(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let favorites
    await waitFor(
      async () => (favorites = await screen.queryAllByTestId('toggleFavorite')),
    )

    expect(global.window.localStorage.getItem('favorites')).toBeNull()
    userEvent.click(favorites[0])
    userEvent.click(favorites[1])
    expect(global.window.localStorage.getItem('favorites')).toEqual(
      JSON.stringify([
        characterMockList.data.results[0],
        characterMockList.data.results[1],
      ]),
    )

    await waitFor(
      async () => (favorites = await screen.queryAllByTestId('toggleFavorite')),
    )
    expect(favorites).toHaveLength(characterMockList.data.results.length)

    userEvent.click(await screen.getByTestId('onlyFavorites'))

    await sleepTest()

    await waitFor(
      async () => (favorites = await screen.queryAllByTestId('toggleFavorite')),
    )
    expect(favorites).toHaveLength(2)
  })
  it('test search by name', async () => {
    renderWithRouter(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let searchInput
    await waitFor(
      async () =>
        (searchInput = await screen.queryByPlaceholderText(
          'Procure por heróis',
        )),
    )

    server.use(
      rest.get(
        'https://gateway.marvel.com/v1/public/characters?limit=20&apikey=ed55883a8d48462344e398744418175d&orderBy=name',
        (req, res, ctx) => res(ctx.json(characterMockListSearch)),
      ),
    )

    userEvent.type(searchInput, 'foo bar{enter}')

    await waitFor(async () => {
      expect(await screen.queryAllByTestId('charCard')).toHaveLength(1)
    })
  })
  it('test ordered by name and open card', async () => {
    const { result: history } = renderHook(() => useHistory())
    global.mockSearch = ''

    renderWithRouter(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let orderedByName
    await waitFor(
      async () => (orderedByName = await screen.getByTestId('ordered')),
    )

    expect(await screen.queryAllByTestId('charCard')).toHaveLength(19)

    server.use(
      rest.get(
        'https://gateway.marvel.com/v1/public/characters?limit=20&apikey=ed55883a8d48462344e398744418175d&orderBy=name',
        (req, res, ctx) => res(ctx.json(characterMockListSearch)),
      ),
    )

    userEvent.click(orderedByName)

    let charCard
    await waitFor(async () => {
      charCard = await screen.queryAllByTestId('charCard')[0]
    })

    userEvent.click(charCard)

    waitFor(() =>
      expect(history.current.location.pathname).toEqual(
        `/Heroi/${characterMockListSearch.data.results[0].id}`,
      ),
    )
  })
})
