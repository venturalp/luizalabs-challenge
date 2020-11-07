import React from 'react'
import EmptyStars from 'Assets/emptyStars.png'
import FullStars from 'Assets/fullStars.png'
import styled from 'styled-components'

const StarsContainer = styled.div`
  position: relative;
  display: inline-block;
  & .stars-fill {
    position: absolute;
    left: 0;
    top: 0;
    width: ${props => `${props.total}%`};
    overflow: hidden;
  }
`

export const rangeValue = (min = 10, max = 100) =>
  Math.random() * (max - min + 1) + min

export const StarProgress = props => (
  <StarsContainer total={rangeValue()} {...props}>
    <img src={EmptyStars} alt="No stars" />
    <div className="stars-fill">
      <img src={FullStars} alt="Stars reviews" />
    </div>
  </StarsContainer>
)
