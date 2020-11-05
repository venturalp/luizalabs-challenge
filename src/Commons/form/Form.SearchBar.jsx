import React from 'react'
import styled from 'styled-components'
import SearchIco from 'Assets/searchIco.png'
import SearchIco2x from 'Assets/searchIco2x.png'

const SearchInput = styled.input`
  appearance: none;
  background-color: ${props => props.theme.lightColor};
  border: 0;
  border-radius: 50px;
  outline: none;
  height: 52px;
  font-size: 18px;
  padding: 0 15px 0 60px;
  color: ${props => props.theme.mainColor};
  background-image: url(${SearchIco});
  background-repeat: no-repeat;
  background-position: 12px center;
  width: ${props => (props.fullWidth ? '100%' : 'inherit')};
  @media (min-width: 768px) {
    font-size: 22px;
    height: 72px;
    background-image: url(${SearchIco2x});
  }
  &:focus {
    outline: none;
    box-shadow: ${props => `0px 0px 3px ${props.theme.mainColor}`};
  }
`

export const SearchBar = ({ fullWidth, ...props }) => (
  <SearchInput type="text" {...props} fullWidth={fullWidth} />
)
