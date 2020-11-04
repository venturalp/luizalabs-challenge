import React from 'react'
import styled from 'styled-components'

const ErrorMessageStyled = styled.p`
  font-size: ${props => props.theme.pxToRem(14)};
  color: red;
  text-align: ${props => (props.align ? props.align : 'center')};
`

export const ErrorMessage = ({ error, align }) => (
  <ErrorMessageStyled align={align}>{error}</ErrorMessageStyled>
)
