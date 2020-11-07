import { CharacterPage } from 'Modules/character/Character.page'
import { ErrorPage } from 'Modules/error/Error.page'
import { HomePage } from 'Modules/home/Home.page'

export const errorRoute = {
  component: ErrorPage,
  path: '*',
}

export const routes = [
  {
    component: HomePage,
    path: '/',
    exact: true,
  },
  {
    component: CharacterPage,
    path: '/Heroi/:id',
    exact: true,
  },
  {
    ...errorRoute,
  },
]
