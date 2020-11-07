import { mainTheme } from 'Config/Config.theme'
import React from 'react'
import ReactLoading from 'react-loading'
import styled, { withTheme } from 'styled-components'

const LoadingContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 100;
`

export const LoadingDefault = withTheme(({ theme }) => (
  <LoadingContainer data-testid="loadingComponent">
    <ReactLoading
      type="spinningBubbles"
      color={mainTheme.mainColor}
      height={60}
      width={60}
    />
  </LoadingContainer>
))
