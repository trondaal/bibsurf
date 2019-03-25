import SearchBar from './containers/searchBar'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import WorksList from './containers/ResultContainers/WorksList'
import ManifestationsList from './containers/ResultContainers/ManifestationsList'
import {FilterList} from './components/SideBarFilter'


class App extends Component {
  render() {
    return (
      <div className='container'>
        <div className='nav-bar'><SearchBar /></div>
        <div className='results-container'>
          <div className='filter-container' >
            <FilterList />
          </div>
          <WorksList />
        </div>
      </div>
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
