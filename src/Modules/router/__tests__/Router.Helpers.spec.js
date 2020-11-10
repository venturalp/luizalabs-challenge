const { getQueryParam } = require('../Router.Helpers')

describe('test router helpers', () => {
  it('test get query params', () => {
    expect(getQueryParam()).toBeFalsy()
  })
})
