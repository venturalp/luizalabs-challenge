import React, { useEffect, useState } from 'react'

const orderQueries = (queries = []) => {
  const reordered = queries?.sort((a, b) => (a.size < b.size ? 1 : -1))

  return reordered
}

export const ResponsiveImage = ({ queries, alt, ...props }) => {
  const [queriesOrdered] = useState(orderQueries(queries))
  const [wSize, setWSize] = useState(global?.window?.innerWidth)
  const [currentImage, setCurrentImage] = useState()
  useEffect(() => {
    const onResize = e => {
      setWSize(e?.target?.innerWidth)
    }

    global.window.addEventListener('resize', onResize)

    return () => global.window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const getImage = queriesOrdered.filter(
      setting => wSize >= setting.size,
    )?.[0]?.img

    setCurrentImage(getImage)
  }, [queriesOrdered, wSize])

  return currentImage ? <img src={currentImage} {...props} alt={alt} /> : null
}
