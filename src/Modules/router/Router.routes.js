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
    viewName: 'homeView',
    title: 'Home',
    exact: true,
  },
  {
    ...errorRoute,
  },
]
