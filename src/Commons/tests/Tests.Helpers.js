import React from 'react'
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from 'Config/Config.theme'

export const hideErrors = () => {
  console.error = jest.fn()
  console.warn = jest.fn()
}

export const renderWithRouter = (component, history) => ({
  ...render(
    <Router history={history || createMemoryHistory()}>{component}</Router>,
  ),
})

export const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={mainTheme}>{children}</ThemeProvider>
)

export const renderWithRouterDocument = (component, history) => ({
  ...render(
    <Router history={history || createMemoryHistory()}>{component}</Router>,
    { container: document.body },
  ),
})

export const sleepTest = (timeToWait = 200) =>
  new Promise(res =>
    setTimeout(() => {
      expect(true).toBe(true)
      res()
    }, timeToWait),
  )

const hasText = (node, text) => node.textContent === text

export const byTextHelper = text => (content, node) => {
  const nodeHasText = hasText(node, text)
  const childrenDontHaveText = Array.from(node.children).every(
    child => !hasText(child, text),
  )

  return nodeHasText && childrenDontHaveText
}
