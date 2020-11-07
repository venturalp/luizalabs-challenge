/* eslint-disable operator-linebreak */
import React from 'react'
import styled, { css } from 'styled-components'

const GridContainer = styled.div`
  justify-content: ${props => props.justify ?? 'space-between'};
  align-content: ${props => props.alignContent ?? 'center'};
  align-items: ${props => props.align ?? 'center'};
  ${props =>
    props.always &&
    css`
      display: flex;
    `}
  @media (min-width: 768px) {
    display: flex;
  }
`

export const Grid = ({ children, ...props }) => (
  <GridContainer {...props}>{children}</GridContainer>
)
