/* eslint-disable operator-linebreak */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from 'Modules/router/Router.routes'
import { useApplicationStore } from 'Modules/application/Application.Store'
import { LoadingDefault } from 'Commons/loading/Loading.LoadingDefault'

export const App = () => {
  const { isLoading } = useApplicationStore()

  return (
    <BrowserRouter>
      {isLoading && <LoadingDefault />}
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.path} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
