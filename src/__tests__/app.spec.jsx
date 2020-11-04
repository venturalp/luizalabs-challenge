import React from 'react'
import App from '../app'
import { renderWithRouter, ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import { renderHook, act } from '@testing-library/react-hooks'
import { useApplicationStore } from 'Modules/application/Application.Store'
import { screen, waitFor } from '@testing-library/dom'

describe('test app', () => {
  it('render test app', () => {
    const { asFragment } = renderWithRouter(
      <ThemeWrapper>
        {' '}
        <App />
      </ThemeWrapper>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
  it('render test app with loading', async () => {
    const { result } = renderHook(() => useApplicationStore())
    act(() => {
      result.current.setIsLoading(true)
    })
    renderWithRouter(
      <ThemeWrapper>
        {' '}
        <App />
      </ThemeWrapper>,
    )
    await waitFor(async () => {
      expect(await screen.getByTestId('loadingComponent')).toBeInTheDocument()
    })
  })
})
