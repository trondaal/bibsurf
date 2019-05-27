import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@material-ui/core'

import {translations} from '../../constants'
import {capitalize} from '../../utils'
import {changeFilterParams} from '../../actions'
class FilterCard extends Component {
  state = {
    value: 'AND',
    expanded: false
  }

  componentDidMount() {
    if(this.props.url) {
      const filterObj = JSON.parse(this.props.url.get(this.props.filterType))
      if(filterObj){
        const selectedValue = filterObj[this.props.title.split(' ').slice(0,2).join(' ')]
        this.setState({
          value: selectedValue ? selectedValue[0] : null
        })
      }
    }
  }

  componentDidUpdate(prevProps) {
    const {url, title, filterType} = {...this.props}
    if(url !== prevProps.url) {
      const filterObj = JSON.parse(url.get(filterType))
      let selectedValue = null
      if(filterObj){
        selectedValue = filterObj[title.split(' ').slice(0,2).join(' ')]
      }
      this.setState({
        value: selectedValue ? selectedValue[0] : null
      })
    }
  }

  handleToggleExpanded = () => {
    this.setState(prevState => {
      return {expanded: !prevState.expanded}
    })
  }

  handleChange = ({target: {value}}) => {
    const {url, title, filterType} = this.props
    this.setState({value})
    this.props.changeFilterParams(url, title, value, filterType)
  }


  renderControlLabels = elements => {
    const sortedOptions = Object.entries(this.props.options)
    sortedOptions.sort((a, b) => b[1] - a[1])
    return sortedOptions.slice(0,elements).map(o => o.join(' ')).map((value, i) => <FormControlLabel key={i} value={value.split(' ').slice(0,-1).join(' ')} control={<Radio />} label={capitalize(value)} />)
  }

  getValues = () => {
    if(this.props.url) {
      const filterObj = JSON.parse(this.props.url.get(this.props.filterType))
      if(filterObj){
        const selectedValue = filterObj[this.props.title.split(' ').slice(0,2).join(' ')]
        return selectedValue ? selectedValue[0] : null
      }
    }
  }


  render() {
    const {value, expanded} = this.state
    const optionLength = Object.entries(this.props.options).length
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>{translations[this.props.title]}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RadioGroup
            aria-label='Filter'
            name='filter'
            value={value}
            onChange={this.handleChange}
          >
            {expanded ? this.renderControlLabels(optionLength) : this.renderControlLabels(6)}
          </RadioGroup>
          {optionLength > 6 ?
            <Button
              variant='contained'
              style={{backgroundColor: "#edeeef"}}
              onClick={this.handleToggleExpanded}
            >
              {expanded ? "Show less" : "Show more"}
            </Button> : null}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}
export default connect(null, {changeFilterParams})(FilterCard)