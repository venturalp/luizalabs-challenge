import { mainTheme } from 'Config/Config.theme'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    font-family: ${mainTheme.fontDefault};
    margin: 0;
    padding: 0;
    color: ${mainTheme.text};
  }
`
