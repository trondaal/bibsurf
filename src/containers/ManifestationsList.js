import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'

import {ResultContainer} from './style'
import {ResultDiv} from '../components/ResultComponents/style'
import {Manifestation, LoaderIcon} from '../components/ResultComponents'
import {newQuery} from '../actions'


class ManifestationsList extends Component {

  componentDidMount() {
    this.props.newQuery(this.props.url)
  }

  componentDidUpdate(prevProps){
    if(prevProps.url !== this.props.url){
      this.props.newQuery(this.props.url)
    }
  }

  renderManifestations = () => {
    return this.props.results.map((manifestation, index) => {
      return <Manifestation detail={manifestation} last={index === this.props.results.length - 1} key={uuid()} />
    })
  }

  render() {
    return(
      <ResultContainer>
        {this.props.results.length > 0 &&
        <ResultDiv style={{alignItems: 'center'}}>
          {this.renderManifestations()}
        </ResultDiv>
        }
        {this.props.loading && <LoaderIcon />}
      </ResultContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.result.results,
    loading: state.result.loading
  }
}

export default connect(mapStateToProps, {newQuery})(ManifestationsList)