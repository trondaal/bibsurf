/* eslint-disable react/jsx-handler-names */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {DetailDiv} from './style'
import {getDetailsOfManifestation} from '../../actions'
import {Title, LoaderIcon} from '.'
import BookIcon from '@material-ui/icons/Book'

class Manifestation extends Component {

  state = {
    toggled: false
  }

  getDetailsOfManifestation = () => {
    if(!this.props.manifestationsDetails.some(detail => detail.manifestationId === this.props.detail.about)) {
      this.props.getDetailsOfManifestation(this.props.detail.about)
      this.toggleDetails()
    }
    else{
      this.setState({toggled: !this.state.toggled})
    }
  }

  toggleDetails = () => {
    this.setState({toggled: !this.state.toggled})
  }

  renderDetails = () => {
    const {about} = this.props.detail
    const manifestation = this.props.manifestationsDetails.filter(detail => detail.manifestationId === about)[0]
    if(!manifestation) {
      return <LoaderIcon style={{'width': '10px', 'height': '10px'}}/>
    }else{
      const {detail} = manifestation
      return (
        <div>
          <div>Contents:</div>
          <ul>
            <li>{detail.title} /
              <Title result={detail.workExpressed} />
              <span> [{detail.workExpressed.formOfWork} - {detail.languageOfExpression} - {detail.contentType}]</span>
            </li>
          </ul>
        </div>
      )
    }
  }


  render() {
    const {titleProper,
      statementOfResponsibility,
      mediaType,
      carrierType,
      placeOfPublication,
      dateOfPublication,
      publisher,
      extent,
      dimensions} = this.props.detail

    const firstLine = `${titleProper} / ${statementOfResponsibility} [${mediaType} - ${carrierType}]`
    const secondLine = `${placeOfPublication}: ${publisher}, ${dateOfPublication} ${extent} ${dimensions}`
    return (
      <DetailDiv last={this.props.last}>
        <div><BookIcon /> {firstLine}</div>
        <div>{secondLine}</div><br />
        <a className={"show-more"} onClick={this.getDetailsOfManifestation}>{!this.state.toggled ? 'Show more >>' : 'Show less <<'}</a>
        {this.state.toggled && this.renderDetails()}
      </DetailDiv>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    manifestationsDetails: state.result.manifestationsDetails
  }
}

export default connect(mapStateToProps, {getDetailsOfManifestation})(Manifestation)