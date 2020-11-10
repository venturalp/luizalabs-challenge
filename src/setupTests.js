import '@testing-library/jest-dom/extend-expect'
import { server } from 'Commons/tests/Tests.MockServer'

jest.setTimeout(3000)

const localStorageMock = () => {
  let store = {}

  return {
    getItem(key) {
      return store[key]
    },
    setItem(key, value) {
      store[key] = value.toString()
    },
    clear() {
      store = {}
    },
    removeItem(key) {
      delete store[key]
    },
  }
}

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock })
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
})
afterAll(() => server.close())
