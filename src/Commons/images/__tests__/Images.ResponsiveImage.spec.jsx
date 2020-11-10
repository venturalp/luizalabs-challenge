import { render, waitFor } from '@testing-library/react'
import React from 'react'
import { ResponsiveImage } from '../Images.ResponsiveImage'
import LogoSmall from 'Assets/logo.png'
import Logo from 'Assets/logo2x.png'
import { sleepTest } from 'Commons/tests/Tests.Helpers'

const logoImgQueries = [
  {
    img: LogoSmall,
    size: 0,
  },
  {
    img: Logo,
    size: 700,
  },
]
describe('test responsive image', () => {
  it('test resize window', async () => {
    global.window.innerWidth = 768
    const { asFragment } = render(<ResponsiveImage queries={logoImgQueries} />)

    expect(asFragment()).toMatchSnapshot()

    global.window.innerWidth = 500
    global.window.dispatchEvent(new Event('resize'))
    await sleepTest()
    await waitFor(() => expect(asFragment()).toMatchSnapshot())
  })
})
