import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import App from './App'
import {DisplayContainer} from './containers'

const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/search' component={DisplayContainer} />
      <Route path='/' component={App} />
    </Switch>
  </Router>
)
export default Root