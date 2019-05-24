/* eslint-disable react/jsx-handler-names */
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {DetailDiv} from './style'
import {getDetailsOfManifestation} from '../../actions'
import {Title, LoaderIcon} from '.'
import {CarrierTypeIcon} from './CarrierTypeIcon'
import {manifestationFields} from '../../constants'

import {Button} from '@material-ui/core'
import UnfoldMore from '@material-ui/icons/UnfoldMoreOutlined'
import UnfoldLess from '@material-ui/icons/UnfoldLessOutlined'


class Manifestation extends Component {
  state = {
    toggled: false
  }

  getDetailsOfManifestation = () => {
    if(!this.props.manifestationsDetails.some(detail => detail.manifestationId === this.props.detail.about)) {
      this.props.getDetailsOfManifestation(this.props.detail.about)
    }
    this.toggleDetails()
  }


  toggleDetails = () => {
    this.setState((prevState) => ({
      toggled: !prevState.toggled
    }))
  }

  renderDetails = () => {
    const {about} = this.props.detail
    const manifestation = this.props.manifestationsDetails.filter(detail => detail.manifestationId === about)[0]
    if(!manifestation) {
      return <LoaderIcon style={{'width': '10px', 'height': '10px'}} />
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

  buildManifestation = details => {
    // Loop over elements in list, include if defined in detalis[manifestationFields[0|1|2]]
    let firstLine = ""
    let type = ""
    let secondLine = ""

    // Building first line
    manifestationFields[0].forEach(field => {
      // [prepend separator, fieldType, append seperator]
      if(details[field[1]]) firstLine += `${field[0]} ${details[field[1]]} ${field[2]}`
    })

    // Building type
    manifestationFields[1].forEach(field => {
      if(details[field[1]]) type += `${field[0]} ${details[field[1]]} ${field[2]}`
    })

    // Building second line
    manifestationFields[2].forEach(field => {
      if(details[field[1]])
      // check if field is ISBN
      // stip all non digits
        field[1] === "identifierForTheManifestation" ? secondLine += `${field[0]} ${details[field[1]].replace(/\D/g,'')} ${field[2]}`
          : secondLine += `${field[0]} ${details[field[1]]}${field[2]}`
    })
    return [firstLine, type, secondLine]
  }

  render() {

    const {last, detail, detail: {carrierType}} = this.props
    const {toggled} = this.state
    const [firstLine, type, secondLine] = this.buildManifestation(detail)
    return (
      <DetailDiv last={last}>
        <div>
          <CarrierTypeIcon carrierType={carrierType} />
          <span className={"manifestation-title"}>{firstLine}</span>
          <span className={"manifestation-type"}>{type}</span>
        </div>
        <div>{secondLine}</div><br />
        <Button className={"show-more"} disableRipple disableFocusRipple onClick={this.getDetailsOfManifestation}>
        Show {!toggled ? 'more ' : 'less '}
          {!toggled ? <UnfoldMore /> : <UnfoldLess />}
        </Button>
        {toggled && this.renderDetails()}
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