import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper
} from '@material-ui/core'

import {translations} from '../../constants'
import {capitalizeFirstLetter} from '../../functions/functions'
import {changeFilterParams} from '../../actions/queryActions'


class FilterCard extends Component {
  state = {
    value: 'AND'
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

  handleChange = event => {
    this.setState({value: event.target.value})
    this.props.changeFilterParams(this.props.url, this.props.title, event.target.value, this.props.filterType)
  }

  renderControlLabels = () => {
    const sortedOptions = Object.entries(this.props.options)
    sortedOptions.sort((a, b) => b[1] - a[1])
    return sortedOptions.slice(0,6).map(o => o.join(' ')).map((value, i) => <FormControlLabel key={i} value={value.split(' ').slice(0,-1).join(' ')} control={<Radio />} label={capitalizeFirstLetter(value)} />)
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
    return (
      this.props.other && this.props.other === 'constant' ?
      // Renders the constant filter options panel
      // using <Paper /> instead of <ExpansionPanel />
        <Paper>
          <div style={{marginLeft: 20}}>
            <Typography>{this.props.title}</Typography>
            <RadioGroup
              aria-label='Gender'
              name='gender1'
              value={this.state.value}
              onChange={this.handleChange}
            >
              {Object.entries(this.props.options).map(o => o.join(" ")).map((l, i) => <FormControlLabel key={i} value={l} control={<Radio />} label={l} />)}
            </RadioGroup>
          </div>
        </Paper>
        :
        // Renders every other panel
        <ExpansionPanel>
          <ExpansionPanelSummary>
            <Typography>{translations[this.props.title]}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <RadioGroup
              aria-label='Gender'
              name='gender1'
              value={this.state.value}
              onChange={this.handleChange}
            >
              {this.renderControlLabels()}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    )
  }
}
export default connect(null, {changeFilterParams})(FilterCard)