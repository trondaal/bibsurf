import React, {Component} from 'react'
import {connect} from 'react-redux'
import ResultList from './containers/ResultContainers/ResultList'

class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='nav-bar'><h2>Her kommer søkebaren</h2></div>
        <div className='results-container'>
          <div className='filter-container'>
            her kommer filterne
          </div>
          <ResultList />
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
