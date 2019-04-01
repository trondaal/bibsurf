import React, {Component} from 'react'
import {connect} from 'react-redux'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {dropDownFiltersTranslated as translated} from '../constants'
import {urlChanged, changeDisplay} from '../actions/queryActions'

class DropDownFilter extends Component {
  state = {
    selected: this.props.options[0]
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    this.props.url.set(translated[this.props.name], event.target.value.toLowerCase())
    if(this.props.name === 'Display') {
      this.props.changeDisplay()
    }
    this.props.urlChanged(true)
  }

  //Select the value of the dropown based on the url.
  getSelected = () => {
    const {url, name, options} = this.props
    const option = options.filter(option => option.toLowerCase() === url.get(translated[name]))
    if(this.props.url.get(translated[name]) && option.length === 1){
      return option
    }else{
      return this.props.options[0]
    }
  }

  render() {

    const {name, options} = this.props

    const {selected} = this.state
    return (
      <FormControl variant='outlined' style={{width: "10vw"}}>
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref
          }}
          htmlFor='outlined-age-simple'
        >
          {name}
        </InputLabel>
        <Select
          value={this.getSelected()}
          onChange={this.handleChange("selected")}
          input={
            <OutlinedInput
              labelWidth={name === "Match" ? 40 : name === "Display" ? 50 : 55}
              label={name}
              name={name}
              id='outlined-age-simple'
            />
          }
        >
          {options.map((e, i) => <MenuItem key={i} value={e}>{e}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}

export default connect(null, {urlChanged, changeDisplay})(DropDownFilter)