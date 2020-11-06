import React, { useEffect, useState } from 'react'
import HeartFilled from 'Assets/heartFilled.png'
import HeartEmpty from 'Assets/heartEmpty.png'
import styled from 'styled-components'

const IcoWrapper = styled.span`
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const Toggle = ({
  falseImg = HeartEmpty,
  trueImg = HeartFilled,
  defaultValue = false,
  label,
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
    <IcoWrapper onClick={handleClick}>
      <img src={isChecked ? trueImg : falseImg} {...props} alt={alt} />
      {label ? <p>{label}</p> : null}
    </IcoWrapper>
  )
}
