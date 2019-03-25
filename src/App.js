import React, {Component} from 'react'
import {connect} from 'react-redux'
import WorksList from './containers/ResultContainers/WorksList'
import ManifestationsList from './containers/ResultContainers/ManifestationsList'
import CategoryList from './containers/CategoryList'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='nav-bar'><h2>Her kommer søkebaren</h2></div>
        <div className='results-container'>
          <div className='filter-container'>
            <CategoryList />
          </div>
          <WorksList />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    query: state.query
  }
)


export default connect(mapStateToProps)(App)
