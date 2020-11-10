import '@testing-library/jest-dom/extend-expect'
import { hideErrors } from 'Commons/tests/Tests.Helpers'
import { server } from 'Commons/tests/Tests.MockServer'

jest.setTimeout(3000)

global.mockPush = jest.fn()
global.mockSearch = '?q=heroname'
global.pathname = '/'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: { pathname: global.pathname, search: global.mockSearch },
    push: global.mockPush,
    listen(func) {
      func(this.location)
    },
  }),
}))

beforeAll(() => {
  server.listen()
  hideErrors()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())
