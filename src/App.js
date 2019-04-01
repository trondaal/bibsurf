import SearchBar from './containers/searchBar'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import WorksList from './containers/ResultContainers/WorksList'
import ManifestationsList from './containers/ResultContainers/ManifestationsList'
import {FilterList} from './components/SideBarFilter'
import DisplayContainer from './DisplayContainer'


class App extends Component {
  render() {
    return (

      <div>gjgjgj</div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    query: state.query,
    filter: state.filter
  }
)


export default connect(mapStateToProps)(App)
