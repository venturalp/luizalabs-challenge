import React from 'react'
import ToggleOff from 'Assets/ToggleOff.png'
import ToggleOn from 'Assets/ToggleOn.png'
import HeroIco from 'Assets/hero.png'
import { Toggle } from 'Commons/form/Form.Toggle'
import { Grid } from 'Commons/container/Container.Grid'
import styled from 'styled-components'

const getMessage = total => {
  if (total > 1) return `Encontrados ${total} heróis`
  if (total === 0) return 'Nenhum herói encontrado'

  return `Encontrado ${total} herói`
}

const CharacterFilterContainer = styled(Grid)`
  & > p {
    color: ${props => props.theme.textMid};
  }
  & > div p {
    color: ${props => props.theme.mainColor};
  }
  & .orderName,
  & .favorites {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    @media (min-width: 768px) {
      margin: 0;
    }
  }

  & .orderName {
    & p {
      margin: 0 10px;
    }
    @media (min-width: 768px) {
      margin-right: 30px;
    }
  }
  & .favorites {
    & p {
      margin-left: 10px;
    }
  }
`

export const CharacterFilter = ({
  onFavorites,
  onOrder,
  total,
  onlyFavorites = false,
  ordered = false,
  className = '',
}) => (
  <CharacterFilterContainer className={className}>
    <p>{getMessage(total)}</p>
    <Grid>
      <div className="orderName">
        <img src={HeroIco} alt="hero" />
        <p>Ordenar por nome - A/Z</p>
        <Toggle
          falseImg={ToggleOff}
          trueImg={ToggleOn}
          onChange={onOrder}
          value={ordered}
        />
      </div>
      <div className="favorites">
        <Toggle
          label="Somente favoritos"
          onChange={onFavorites}
          value={onlyFavorites}
        />
      </div>
    </Grid>
  </CharacterFilterContainer>
)
