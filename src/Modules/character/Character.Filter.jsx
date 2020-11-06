import React from 'react'
import styled from 'styled-components'

const FilterContainer = styled.div`
  display: grid;
  justify-content: space-between;
  align-content: center;
`

const getMessage = total => {
  if (total > 1) return `Encontrados ${total} heróis`
  if (total === 0) return 'Nenhum herói encontrado'

  return `Encontrado ${total} herói`
}

export const CharacterFilter = ({
  onFavorites,
  onOrder,
  total,
  onlyFavorites = false,
  ordered = false,
}) => (
  <FilterContainer>
    <p>{getMessage(total)}</p>
  </FilterContainer>
)
