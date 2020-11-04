import React from 'react'
import styled from 'styled-components'

const Page404Container = styled.div`
  background-color: #ccc;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ErrorPage = () => (
  <Page404Container>
    <h1>Page not found</h1>
  </Page404Container>
)
