import { render } from '@testing-library/react'
import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { ErrorPage } from '../Error.page'

describe('test Error page', () => {
  it('render error page', () => {
    const { asFragment } = render(
      <ThemeWrapper>
        <ErrorPage />
      </ThemeWrapper>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
