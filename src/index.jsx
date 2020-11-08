import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from 'Config/Config.theme'
import { GlobalStyles } from 'Commons/styles/Styles.global'
import 'Assets/static/_redirects'

render(
  <ThemeProvider theme={mainTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
)
