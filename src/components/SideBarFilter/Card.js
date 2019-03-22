import React, {Component} from 'react'
import {ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
  Paper
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
              {Object.entries(this.props.options).map(o => o.join(" ")).map((l, i) => <FormControlLabel key={i} value={l} control={<Radio />} label={l} />)}
            </RadioGroup>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    )
  }
}