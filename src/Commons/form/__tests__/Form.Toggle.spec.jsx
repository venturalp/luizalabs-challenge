import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { Toggle } from '../Form.Toggle'

describe('test form toggle', () => {
  it('test toggle uncontrolled', () => {
    const { asFragment } = render(
      <ThemeWrapper>
        <Toggle defaultValue={false} id="toggle" />
      </ThemeWrapper>,
    )

    expect(asFragment()).toMatchSnapshot()

    userEvent.click(screen.getByTestId('toggle'))

    expect(asFragment()).toMatchSnapshot()
  })
})
