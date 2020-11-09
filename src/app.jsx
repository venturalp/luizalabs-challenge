/* eslint-disable operator-linebreak */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from 'Modules/router/Router.routes'
import { useApplicationStore } from 'Modules/application/Application.Store'
import { LoadingDefault } from 'Commons/loading/Loading.LoadingDefault'
import { SnackMessage } from 'Commons/message/Message.SnackMessage'

export const App = () => {
  const {
    isLoading,
    snackProperties,
    setSnackProperties,
  } = useApplicationStore()

  return (
    <BrowserRouter>
      {isLoading && <LoadingDefault />}
      <SnackMessage
        open={snackProperties.open}
        onClose={() => {
          setSnackProperties({ ...snackProperties, open: false })
        }}
      >
        {snackProperties.msg}
      </SnackMessage>
      <Switch>
        {routes.map(route => (
          <Route {...route} key={route.path} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
