import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import BottomScrollListener from 'react-bottom-scroll-listener'

import {newQuery, getNext} from '../actions'
import {Result, LoaderIcon} from '../components/ResultComponents'
import {ResultContainer} from './style'


class WorksList extends Component {

  componentDidMount() {
    this.props.newQuery(this.props.url)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.url !== this.props.url){
      this.props.newQuery(this.props.url)
    }
  }


  renderResults = () => {
    return this.props.results.map(result => {
      return <Result result={result} key={uuid()} type='work' />
    })
  }

  handleGetNext = () => {
    if(!this.props.loading || this.props.results.length !== this.props.resultSize){
      this.props.getNext(this.props.next)
    }
  }


  render() {

    if(!this.props.results) {
      return (
        <ResultContainer />
      )
    }
    return (
      <ResultContainer>
        <BottomScrollListener onBottom={this.handleGetNext} debounce={500}>
          {this.renderResults()}
        </BottomScrollListener>
        {this.props.loading && <LoaderIcon />}
      </ResultContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.result.results,
    next: state.result.next,
    resultSize: state.result.resultSize,
    loading: state.result.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuery: (url) => dispatch(newQuery(url)),
    getNext: (next) => dispatch(getNext(next))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(WorksList)