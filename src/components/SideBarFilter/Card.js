import React, {Component} from 'react'
import {ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider
} from '@material-ui/core'

export default class FilterCard extends Component {
  state = {
    value: 'AND'
  }

  handleChange = event => {
    this.setState({value: event.target.value})
  }


  render() {
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary>
          <Typography>{this.props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RadioGroup
            aria-label='Gender'
            name='gender1'
            value={this.state.value}
            onChange={this.handleChange}
          >
            {Object.entries(this.props.options).map(o => o.join(" ")).map((l, i) => <FormControlLabel key={i} value={l} control={<Radio />} label={l} />)}
          </RadioGroup>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}