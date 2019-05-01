import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'


import {newQuery} from '../../actions/resultActions'
import Result from '../../components/ResultComponents/Result'
import {ResultDetail} from '../../components/ResultComponents/ResultDetail'
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
    return this.props.results.map(result => {
      return <Result result={result} key={uuid()} type='expressions' />
    })
  }

  render() {
    return (
      <ResultContainer>
        {this.renderExpressions()}
      </ResultContainer>
    )
  }
}

const mapStateToProps = (state) => (
  {
    results: state.result.results,
    next: state.result.next,
    resultSize: state.result.resultSize,
    loading: state.result.loading
  }
)

export default connect(mapStateToProps, {newQuery})(ExpressionsList)