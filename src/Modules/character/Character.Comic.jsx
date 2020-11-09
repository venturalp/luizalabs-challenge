import React from 'react'
import styled from 'styled-components'

export const Comic = ({ title, images }) => {
  const ComicWrapper = styled.div`
    & img {
      max-width: 100%;
    }

    & p {
      font-weight: 500;
      font-size: ${props => props.theme.pxToRem(15)};
      line-height: ${props => props.theme.pxToRem(22)};
    }
  `

  return (
    <ComicWrapper>
      <img src={`${images?.[0]?.path}.${images?.[0]?.extension}`} alt={title} />
      <p>{title}</p>
    </ComicWrapper>
  )
}
