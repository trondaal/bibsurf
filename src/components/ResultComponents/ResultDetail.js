import React, {Component} from 'react'
import {DetailDiv} from './style'

export class ResultDetail extends Component {

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
        <div><span>{firstLine}</span></div>
        <span>{secondLine}</span>
      </DetailDiv>
    )
  }
}

export default ResultDetail