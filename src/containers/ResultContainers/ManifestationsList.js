import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'

import {ResultContainer} from './style'
import {ResultDiv} from '../../components/ResultComponents/style'
import {ResultDetail} from '../../components/ResultComponents/ResultDetail'
import {newQuery} from '../../actions/resultActions'


class ManifestationsList extends Component {

  componentDidMount() {
    console.log(this.props.results)
    this.props.newQuery(this.props.url)
  }

  componentDidUpdate(prevProps){
    if(prevProps.url !== this.props.url){
      this.props.newQuery(this.props.url)
    }
  }

  renderManifestations = () => {
    return this.props.results.map((manifestation, index) => {
      return <ResultDetail detail={manifestation} last={index === this.props.results.length - 1} key={uuid()} />;
    })
  }

  render() {
    return(
      <ResultContainer>
        {this.props.results &&
        <ResultDiv style={{alignItems: 'center'}}>
          {this.renderManifestations()}
        </ResultDiv>
        }
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