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
    if(this.props.url !== prevProps.url) {
      const filterObj = JSON.parse(this.props.url.get(this.props.filterType))
      if(filterObj){
        const selectedValue = filterObj[this.props.title.split(' ').slice(0,2).join(' ')]
        this.setState({
          value: selectedValue ? selectedValue[0] : null
        })
      } else{
        this.setState({value: null})
      }
    }
  }

  toggleExpanded = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  handleChange = event => {
    this.setState({value: event.target.value})
    this.props.changeFilterParams(this.props.url, this.props.title, event.target.value, this.props.filterType)
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
      <ExpansionPanel style={{/* root: {
        expanded: {
          backgroundColor: "blue"
        }
      } */
        //backgroundColor: "red"
      }}
      >
        <ExpansionPanelSummary>
          <Typography>{translations[this.props.title]}</Typography>
        </ExpansionPanelSummary>
        {}
        <ExpansionPanelDetails>
          <RadioGroup
            aria-label='Gender'
            name='gender1'
            value={value}
            onChange={this.handleChange}
          >
            {expanded ? this.renderControlLabels(optionLength) : this.renderControlLabels(6)}
            {optionLength > 6 ?
              <Button
                variant={"contained"}
                style={{backgroundColor: "#edeeef"}}
                onClick={() => this.toggleExpanded()}
              >
                {expanded ? "Show less" : "Show more"}
              </Button> : null}
          </RadioGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}
export default connect(null, {changeFilterParams})(FilterCard)