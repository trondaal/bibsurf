import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'

import {ResultContainer} from './style'
import {ResultDiv} from '../../components/ResultComponents/style'
import {ResultDetail} from '../../components/ResultComponents/ResultDetail'
import {newQuery} from '../../actions/resultActions'


class ManifestationsList extends Component {

  componentDidMount() {
    this.props.newQuery('http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?query=murder&querytype=all&displaytype=manifestations&subcollection=&rankingtype=default&categories=%7B%7D&roles=%7B%7D&filtermethod=&subtree=false')
  }

  renderManifestations = () => {
    return this.props.results.map((manifestation, index) => {
      return <ResultDetail detail={manifestation} last={index === this.props.results.length - 1} key={uuid()} />;
    })
  }

  render() {
    return(
    <ResultContainer>
      <ResultDiv style={{alignItems: 'center'}}>
        {this.renderManifestations()}
      </ResultDiv>
    </ResultContainer>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    results: state.result.results
  }
}

export default connect(mapStateToProps, {newQuery})(ManifestationsList)