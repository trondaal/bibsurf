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
    switch (this.props.url.get('displaytype')) {
    case "manifestations":
      return <ManifestationsList url={this.props.url.toString()} />
    case "works":
      return (<WorksList url={this.props.url.toString()} />)
    case "expressions":
      return (<ExpressionsList url={this.props.url.toString()} />)
    default:
      return <WorksList url={this.props.url.toString()} />
    }
  }

  generateView = () => {
    return(
      <div className='container'>
        <div className='nav-bar'>{<SearchBar url={this.props.url} />}</div>
        <div className='results-container'>
          <div className='filter-container' >
            <FilterList url={this.props.url} />
          </div>
          {this.props.url && this.chooseDisplay()}
        </div>
      </div>
    )
  }

  render() {
    return this.props.url && this.generateView()
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.query.url
  }
}

export default connect(mapStateToProps, {setSearchParams})(DisplayContainer)