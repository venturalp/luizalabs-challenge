import { CharacterFilter } from 'Modules/character/Character.Filter'

const { default: styled } = require('styled-components')

export const HomeContainer = styled.div`
  text-align: center;
`

export const HeaderHome = styled.form`
  max-width: 80%;
  width: 1024px;
  margin: 0 auto 45px;
  & p {
    margin-bottom: 45px;
  }
`

export const FilterContainer = styled(CharacterFilter)`
  max-width: 95%;
  width: 1100px;
  margin: 60px auto 25px;
`

export const Footer = styled.footer`
  height: 60px;
  background-color: ${props => props.theme.mainColor};
`

export const CharacterCardContainer = styled.div`
  max-width: 95%;
  width: 1100px;
  margin: 0 auto 120px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: 35px;
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`
