import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {DisplayContainer} from './containers'
import LandingPage from './components/LandingPage'


const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/search' component={DisplayContainer} />
    </Switch>
  </Router>
)
export default Root