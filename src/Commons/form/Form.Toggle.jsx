import React, { useEffect, useState } from 'react'
import HeartFilled from 'Assets/heartFilled.png'
import HeartEmpty from 'Assets/heartEmpty.png'
import styled from 'styled-components'

const IcoWrapper = styled.span`
  cursor: pointer;
`

export const Toggle = ({
  emptyImg = HeartEmpty,
  filledImg = HeartFilled,
  defaultValue = false,
  value,
  alt = 'toggleIco',
  onChange,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(defaultValue)

  const handleClick = () => {
    if (onChange) onChange({ target: { value: !isChecked } })

    setIsChecked(!isChecked)
  }

  useEffect(() => {
    setIsChecked(value)
  }, [value])

  return (
    <IcoWrapper>
      <img
        src={isChecked ? filledImg : emptyImg}
        {...props}
        alt={alt}
        onClick={handleClick}
      />
    </IcoWrapper>
  )
}
