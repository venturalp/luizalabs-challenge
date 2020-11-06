import { Toggle } from 'Commons/form/Form.Toggle'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const CardWrapper = styled.div``

const CardBody = styled.div`
  border-bottom: ${props => `4px solid  ${props.theme.mainColor}`};
  background-image: ${props => `url('${props.img}')`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: ${props => `${props.height}px`};
  width: 100%;
`

const CardFooter = styled.div`
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  & > p {
    padding-right: 20px;
  }
`

export const CharacterCard = ({
  name,
  onFavorite,
  isFavorite = false,
  img,
  ...props
}) => {
  const [height, setHeight] = useState(200)
  const cardRef = useRef()

  useEffect(() => {
    const onResize = e => {
      setHeight(cardRef.current.offsetWidth)
    }

    global?.window?.addEventListener('resize', onResize)

    return () => global?.window?.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setHeight(cardRef.current.offsetWidth)
  }, [cardRef])

  return (
    <CardWrapper {...props} ref={cardRef}>
      <CardBody img={img} height={height} />
      <CardFooter>
        <p>{name}</p>
        <Toggle defaultValue={isFavorite} onChange={onFavorite} />
      </CardFooter>
    </CardWrapper>
  )
}
