import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import BottomScrollListener from 'react-bottom-scroll-listener'

import {newQuery, getNext} from '../actions'
import {Result, LoaderIcon} from '../components/ResultComponents'

import {ResultContainer} from './style'

class ExpressionsList extends Component {

  componentDidMount() {
    this.props.newQuery(this.props.url)
  }

  componentDidUpdate(prevProps) {
    if(prevProps.url !== this.props.url){
      this.props.newQuery(this.props.url)
    }
  }

  renderExpressions = () => {
    return this.props.results.slice(0, this.props.resultSize).map(result => {
      return <Result result={result} key={uuid()} type='expressions' />
    })
  }

  handleGetNext = () => {
    if(!this.props.loading && this.props.results.length < this.props.resultSize){
      this.props.getNext(this.props.next)
    }
  }

  render() {
    return (
      <ResultContainer>
        <BottomScrollListener onBottom={this.handleGetNext} debounce={500}>
          {this.renderExpressions()}
        </BottomScrollListener>
        {this.props.loading && <LoaderIcon />}
      </ResultContainer>
    )
  }
}

const mapStateToProps = state => (
  {
    results: state.result.results,
    next: state.result.next,
    resultSize: state.result.resultSize,
    loading: state.result.loading
  }
)

export default connect(mapStateToProps, {newQuery, getNext})(ExpressionsList)