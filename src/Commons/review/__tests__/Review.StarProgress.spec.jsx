/* eslint-disable import/no-duplicates */

import { rangeValue } from '../Review.StarProgress'

describe('test star review', () => {
  it('test range random', () => {
    let result = rangeValue(30, 40)
    expect(result).toBeLessThanOrEqual(40)
    expect(result).not.toBeLessThan(30)
    result = rangeValue()
    expect(result).toBeLessThanOrEqual(100)
    expect(result).not.toBeLessThan(10)
  })
})
