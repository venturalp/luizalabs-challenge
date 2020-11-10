import { screen, waitFor } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import {
  renderWithRouter,
  sleepTest,
  ThemeWrapper,
} from 'Commons/tests/Tests.Helpers'
import React from 'react'
import ReactRouter from 'react-router-dom'
import { CharacterPage } from '../Character.page'
import { useCharacterStore } from '../Character.Store'
import { characterMock } from '../mocks/Character.Mock'

jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1017100' })

describe('test character page', () => {
  it('render page and favorite', async () => {
    renderWithRouter(
      <ThemeWrapper>
        <CharacterPage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let toggleFav

    waitFor(() => (toggleFav = screen.getByTestId('toggleChar')))

    userEvent.click(toggleFav)

    waitFor(() => {
      expect(
        JSON.parse(global.window.localStorage.getItem('favorites')),
      ).toHaveLength(1)
    })
  })

  it('render page and search', async () => {
    renderWithRouter(
      <ThemeWrapper>
        <CharacterPage />
      </ThemeWrapper>,
    )

    await sleepTest()

    userEvent.type(
      screen.getByPlaceholderText('Procure por heróis'),
      'foo bar{enter}',
    )

    waitFor(() => {
      expect(global.mockPush).toHaveBeenCalledWith('/?q=foo bar')
    })
  })

  it('render page with default character selected and max favorite', async () => {
    const { result: charStore } = renderHook(() => useCharacterStore())
    act(() => {
      charStore.current.setCurrentCharacter(characterMock)
      charStore.current.setFavorites([
        { id: 'bar' },
        { id: 'bar' },
        { id: 'bar' },
        { id: 'bar' },
        { id: 'bar' },
      ])
    })

    renderWithRouter(
      <ThemeWrapper>
        <CharacterPage />
      </ThemeWrapper>,
    )

    await sleepTest()

    let toggleFav

    waitFor(() => (toggleFav = screen.getByTestId('toggleChar')))

    userEvent.click(toggleFav)

    waitFor(() => {
      expect(
        screen.getByText('Só é possível ter no máximo 5 heróis favoritos!'),
      ).toBeInTheDocument()
    })

    expect(
      JSON.parse(global.window.localStorage.getItem('favorites')),
    ).toHaveLength(5)
  })
})
