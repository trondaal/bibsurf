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

  componentDidUpdate(prevProps) {
    if(this.props.url !== prevProps.url) {
      const filterMethod = this.props.url.get('filtermethod')
      if(filterMethod) {
        this.setState({value: filterMethod.toUpperCase()})
      }
    }
  }

  handleChange = ({target: {value}}) => {
    this.setState({value: value})
    this.props.changeSearchParams(this.props.url, 'filtermethod', value.toLowerCase())
  }


  render() {
    const {props: {title, options}, state: {value}} = this
    return (
      <Paper>
        <div style={{marginLeft: 20}}>
          <Typography>{title}</Typography>
          <RadioGroup
            name={title}
            value={value}
            onChange={this.handleChange}
          >
            {Object.keys(options).map((l, i) => <FormControlLabel key={i} value={l} control={<Radio />} label={l} />)}
          </RadioGroup>
        </div>
      </Paper>
    )
  }
}

export default connect(null, {changeSearchParams})(FilterOption)