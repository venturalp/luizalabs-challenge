import { render } from '@testing-library/react'
import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { SnackMessage } from '../Message.SnackMessage'

describe('test SnackMessage', () => {
  it('render snack message w default values', () => {
    const { asFragment } = render(
      <ThemeWrapper>
        <SnackMessage>foo bar</SnackMessage>
      </ThemeWrapper>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
