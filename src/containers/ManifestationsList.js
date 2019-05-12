import React, {Component} from 'react'
import {connect} from 'react-redux'
import uuid from 'uuid'
import BottomScrollListener from 'react-bottom-scroll-listener'

import {ResultContainer} from './style'
import {ResultDiv} from '../components/ResultComponents/style'
import {Manifestation, LoaderIcon} from '../components/ResultComponents'
import {newQuery, getNext} from '../actions'


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
    return this.props.results.slice(0,this.props.resultSize).map((manifestation, index) => {
      return <Manifestation detail={manifestation} last={index === this.props.results.length - 1} key={uuid()} />
    })
  }

  handleGetNext = () => {
    if(!this.props.loading && this.props.results.length < this.props.resultSize){
      this.props.getNext(this.props.next)
    }
  }

  render() {
    return(
      <ResultContainer>
        {this.props.results.length > 0 &&
        <BottomScrollListener onBottom={this.handleGetNext} debounce={500}>
          <ResultDiv style={{alignItems: 'center'}}>
            {this.renderManifestations()}
          </ResultDiv>
        </BottomScrollListener>
        }
        {this.props.loading && <LoaderIcon />}
      </ResultContainer>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.result.results,
    loading: state.result.loading,
    resultSize: state.result.resultSize,
    next: state.result.next
  }
}

export default connect(mapStateToProps, {newQuery, getNext})(ManifestationsList)