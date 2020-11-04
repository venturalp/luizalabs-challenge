import { render } from '@testing-library/react'
import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { ErrorMessage } from '../Message.ErrorMessage'

describe('test ErrorMessage', () => {
  it('test with prop align', () => {
    const { asFragment } = render(
      <ThemeWrapper>
        <ErrorMessage error="foo bar" align="left" />
      </ThemeWrapper>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
