import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'

import {newQuery, getNext} from '../../actions/resultActions'
import Result from '../../components/ResultComponents/Result'
import {ResultContainer} from './style'
import {BASE_URL} from '../../constants'


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
      return <Result result={result} key={uuid()} />
    })
  }

  handleGetNext = () => {
    this.props.getNext(this.props.next)
  }


  render() {
    if(!this.props.results) {
      return (
        <ResultContainer />
      )
    }
    return (
      <ResultContainer>
        {this.renderResults()}
        {this.props.results.length !== this.props.resultSize && <button onClick={this.handleGetNext}>Get more result</button>}
      </ResultContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.result.results,
    next: state.result.next,
    resultSize: state.result.resultSize
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newQuery: (url) => dispatch(newQuery(url)),
    getNext: (next) => dispatch(getNext(next))
  }
}


export default connect(mapStateToProps, mapDispatchToProps )(WorksList)