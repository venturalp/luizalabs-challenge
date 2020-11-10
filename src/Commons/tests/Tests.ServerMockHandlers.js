import {
  characterComicsMock,
  characterMock,
  characterMockList,
} from 'Modules/character/mocks/Character.Mock'
import { rest } from 'msw'

const handlers = [
  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1011334',
    (req, res, ctx) => res(ctx.json(characterMock)),
  ),
  rest.get(
    'https://gateway.marvel.com/v1/public/characters?limit=20',
    (req, res, ctx) => res(ctx.json(characterMockList)),
  ),
  rest.get(
    'https://gateway.marvel.com/v1/public/characters/1011334/comics?limit=10&orderBy=-onsaleDate',
    (req, res, ctx) => res(ctx.json(characterComicsMock)),
  ),
]

export { handlers }
