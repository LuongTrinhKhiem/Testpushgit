import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import login from '../Login/login.js'
import RouterReact from '../router/router.js'

require('dotenv').config()

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={login} />
        <RouterReact />
      </Switch>
    </Router>
  )
}

export default App
