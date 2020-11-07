import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'

const SnackContainer = styled.div`
  display: flex;
  min-height: 80px;
  min-width: 300px;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: ${props => (props.open ? '10px' : `-${2 * props.height}px`)};
  right: 20px;
  max-width: 95%;
  z-index: 2000;
  padding: 10px 20px;
  color: ${props => props.theme.mainColor};
  border: ${props => `2px solid ${props.theme.mainColor}`};
  background-color: ${props => props.theme.lightColor};
  border-radius: 15px;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
  transition-property: all;
  transition-duration: 0.25s;
`

export const SnackMessage = ({
  open = false,
  time = 4000,
  children,
  onClose,
}) => {
  const refSnack = useRef()
  const [timer, setTimer] = useState()

  useEffect(() => {
    if (open) {
      setTimer(setTimeout(() => onClose(), time))
    } else if (timer) {
      clearTimeout(timer)
      setTimer()
    }
  }, [open, time])

  return (
    <SnackContainer
      open={open}
      ref={refSnack}
      height={refSnack?.current?.offsetHeight}
      onClick={onClose}
    >
      {children}
    </SnackContainer>
  )
}
