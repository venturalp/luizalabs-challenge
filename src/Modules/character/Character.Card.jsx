import { Toggle } from 'Commons/form/Form.Toggle'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const CardBody = styled.div`
  border-bottom: ${props => `4px solid  ${props.theme.mainColor}`};
  background-image: ${props => `url('${props.img}')`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: ${props => `${props.height}px`};
  width: 100%;
  cursor: pointer;
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
  onClick,
  isFavorite = false,
  img,
  ...props
}) => {
  const [height, setHeight] = useState(200)
  const cardRef = useRef()

  useEffect(() => {
    const onResize = () => {
      setHeight(cardRef.current.offsetWidth)
    }

    global?.window?.addEventListener('resize', onResize)

    return () => global?.window?.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    setHeight(cardRef.current.offsetWidth)
  }, [cardRef])

  return (
    <div {...props} ref={cardRef}>
      <CardBody
        img={img}
        height={height}
        onClick={onClick}
        data-testid="charCard"
      />
      <CardFooter>
        <p>{name}</p>
        <Toggle onChange={onFavorite} value={isFavorite} id="toggleFavorite" />
      </CardFooter>
    </div>
  )
}
