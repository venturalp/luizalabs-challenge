import React from 'react'
import styled from 'styled-components'

const GridContainer = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: ${props => props.justify ?? 'space-between'};
    align-content: ${props => props.alignContent ?? 'center'};
    align-items: ${props => props.align ?? 'center'};
  }
`

export const Grid = ({ children, ...props }) => (
  <GridContainer {...props}>{children}</GridContainer>
)
