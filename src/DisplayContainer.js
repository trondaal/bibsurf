import React, {Component} from 'react'

import {connect} from 'react-redux'

import {FilterList} from './components/SideBarFilter'
import SearchBar from './containers/searchBar'
import WorksList from './containers/ResultContainers/WorksList'
import ManifestationsList from './containers/ResultContainers/ManifestationsList'
import {setSearchParams} from './actions/queryActions'

class DisplayContainer extends Component{


  componentDidMount() {
    this.props.setSearchParams(this.props.location.search)
  }

  componentDidUpdate() {
    if(this.props.url.toString() !== this.props.location.search.slice(1)){
      this.props.history.push(`/search?${this.props.url.toString()}`)
    }
  }

  chooseDisplay = () => {
    switch (this.props.url.get('displaytype')) {
    case "manifestations":
      return <ManifestationsList url={this.props.url.toString()} />
    case "works":
      return (<WorksList url={this.props.url.toString()} />)
    default:
      return this.props.history.push('/')
    }
  }

  render() {
    return(
      <div className='container'>
        <div className='nav-bar'>{this.props.url && <SearchBar url={this.props.url} />}</div>
        <div className='results-container'>
          <div className='filter-container' >
            <FilterList url={this.props.url} />
          </div>
          {this.props.url && this.chooseDisplay()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    urlchanged: state.query.urlChanged,
    url: state.query.url
  }
}

export default connect(mapStateToProps, {setSearchParams})(DisplayContainer)