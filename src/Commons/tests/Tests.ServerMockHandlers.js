import {
  characterComicsMock,
  characterMock,
  characterMockList,
} from 'Modules/character/mocks/Character.Mock'
import { rest } from 'msw'

const handlers = [
  rest.get('http://foo.bar', (req, res, ctx) =>
    res(ctx.json({ success: true })),
  ),
  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1017100',
    (req, res, ctx) => res(ctx.json(characterMock)),
  ),
  rest.get(
    'https://gateway.marvel.com/v1/public/characters?limit=20&apikey=ed55883a8d48462344e398744418175d&orderBy=name',
    (req, res, ctx) => res(ctx.json(characterMockList)),
  ),
  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1017100/comics?limit=10&orderBy=-onsaleDate',
    (req, res, ctx) => res(ctx.json(characterComicsMock)),
  ),
]

export { handlers }
