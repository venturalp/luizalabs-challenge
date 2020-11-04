import { rest } from 'msw'

const handlers = [
  rest.get('http://foo.bar', (req, res, ctx) =>
    res(ctx.json({ success: true })),
  ),
]

export { handlers }
