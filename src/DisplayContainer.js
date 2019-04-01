import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {FilterList} from './components/SideBarFilter'
import SearchBar from './containers/searchBar'
import WorksList from './containers/ResultContainers/WorksList'
import ManifestationsList from './containers/ResultContainers/ManifestationsList'
import {urlChanged} from './actions/queryActions'

class DisplayContainer extends Component{

  state = {
    urlParams: null
  }

  componentDidMount() {
    this.setState({urlParams: new URLSearchParams(this.props.location.search)})
  }

  componentDidUpdate() {
    if(this.state.urlParams.toString() !== this.props.location.search.slice(1)){
      this.props.urlChanged(false)
      this.props.history.push(`/search?${this.state.urlParams.toString()}`)
    }
  }

  chooseDisplay = () => {
    switch (this.state.urlParams.get('displaytype')) {
    case "manifestations":
      return <ManifestationsList url={this.state.urlParams.toString()} />
    case "works":
      return (<WorksList url={this.state.urlParams.toString()} />)
    default:
      return this.props.history.push('/')
    }
  }

  render() {

    return(
      <div className='container'>
        <div className='nav-bar'>{this.state.urlParams && <SearchBar url={this.state.urlParams} />}</div>
        <div className='results-container'>
          <div className='filter-container' >
            <FilterList />
          </div>
          {this.state.urlParams && this.chooseDisplay()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.query.urlChanged
  }
}

export default connect(mapStateToProps, {urlChanged})(DisplayContainer)