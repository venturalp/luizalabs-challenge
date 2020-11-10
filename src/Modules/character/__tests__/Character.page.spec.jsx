import { screen, waitFor } from '@testing-library/dom'
import { renderWithRouter, ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import { HomePage } from 'Modules/home/Home.page'
import React from 'react'

describe('test home page', () => {
  it('test check favorites', async () => {
    const { asFragment } = renderWithRouter(
      <ThemeWrapper>
        <HomePage />
      </ThemeWrapper>,
    )

    let favorites
    await waitFor(
      async () => (favorites = await screen.queryAllByTestId('toggleFavorite')),
    )
    expect(asFragment()).toMatchSnapshot()
    console.log(favorites)
  })
})
