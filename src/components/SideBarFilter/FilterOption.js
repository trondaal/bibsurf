import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'

import {changeSearchParams} from '../../actions'

class FilterOption extends Component {

  state = {
    value: "AND"
  }

  componentDidMount() {

    if(this.props.url) {
      const filterMethod = this.props.url.get('filtermethod')
      if(filterMethod !== null) {
        this.setState({
          value: filterMethod.toUpperCase()
        })
      }
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value})
    this.props.changeSearchParams(this.props.url, 'filtermethod', event.target.value.toLowerCase().slice(0, -1))
  }


  render() {
    return (
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
    )
  }

}

export default connect(null, {changeSearchParams})(FilterOption)