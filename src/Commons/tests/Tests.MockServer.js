import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { handlers } from './Tests.ServerMockHandlers'

const server = setupServer(...handlers)
export { server, rest }
