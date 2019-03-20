import React, {Component} from 'react'
import {connect} from 'react-redux'

import {newQuery} from '../../actions/resultActions'
import Result from '../../components/ResultComponents/Result'

class ResultList extends Component {

    componentDidMount(){
        this.props.newQuery('http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?query=murder&querytype=all&displaytype=works&subcollection=&rankingtype=default&categories=%7B%7D&roles=%7B%7D&filtermethod=&subtree=false')
    }

    renderResults = () => {
      return this.props.results.map(result => {
        return <Result result={result} key={result.about} />
      })
    }

    render() {
      if(!this.props.results) {
        return (
          <div className='result-container' />
        )
      }
      return (
        <div className='result-container'>{this.renderResults()}</div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    results: state.result.results,
    next: state.result.next,
    selectedFilters: state.query.selectedFilters,
    terms: state.query.terms
  }
}


export default connect(mapStateToProps, {newQuery} )(ResultList)