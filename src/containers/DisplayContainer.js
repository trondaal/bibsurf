import React, {Component} from 'react'
import {connect} from 'react-redux'

import {FilterList} from '../components/SideBarFilter'
import {WorksList, ManifestationsList, ExpressionsList, SearchBar} from '.'
import {setSearchParams} from '../actions'


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
    const {url} = this.props
    switch (url.get('displaytype')) {
    case "manifestations":
      return <ManifestationsList url={url.toString()} />
    case "works":
      return (<WorksList url={url.toString()} />)
    case "expressions":
      return (<ExpressionsList url={url.toString()} />)
    default:
      return <WorksList url={url.toString()} />
    }
  }

  generateView = () => {
    const {url} = this.props
    return(
      <div className='container'>
        <div className='nav-bar'>{<SearchBar url={url} />}</div>
        <div className='results-container'>
          <div className='filter-container' >
            <FilterList url={url} />
          </div>
          {url && this.chooseDisplay()}
        </div>
      </div>
    )
  }

  render() {
    return this.props.url && this.generateView()
  }
}

const mapStateToProps = state => {
  return {
    url: state.query.url
  }
}

export default connect(mapStateToProps, {setSearchParams})(DisplayContainer)