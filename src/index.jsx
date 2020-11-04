import React from 'react'
import { render } from 'react-dom'
import App from './app'
import 'leaflet/dist/leaflet.css'
import { ThemeProvider } from 'styled-components'
import { mainTheme } from 'Config/Config.theme'
import { GlobalStyles } from 'Commons/styles/Styles.global'

render(
  <ThemeProvider theme={mainTheme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>,
  document.getElementById('app'),
)
