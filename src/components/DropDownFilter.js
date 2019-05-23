import React, {Component} from 'react'
import {connect} from 'react-redux'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import {dropDownFiltersTranslated as translated} from '../constants'
import {changeSearchParams} from '../actions'

class DropDownFilter extends Component {
  state = {
    selected: this.props.options[0]
  }

  handleChange = name => event => {
    console.log(event.target.value)
    if(this.state.selected !== event.target.value) {
      this.setState({
        [name]: event.target.value
      })
      this.props.changeSearchParams(this.props.url.toString(), translated[this.props.name], event.target.value.toLowerCase())
    }
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
    return (
      <FormControl variant='outlined' style={{width: "10vw"}}>
        <InputLabel
          style={{'color': '#bbdefb'}}
          ref={ref => {
            this.InputLabelRef = ref
          }}
          htmlFor='outlined-age-simple'
        >
          {name}
        </InputLabel>
        <Select
          style={{'color': '#bbdefb'}}
          value={this.getSelected()}
          onChange={this.handleChange("selected")}
          input={
            <OutlinedInput
              style={{'color': '#bbdefb', 'border-color': '#bbdefb'}}
              labelWidth={name === "Match" ? 40 : name === "Display" ? 50 : 55}
              label={name}
              name={name}
              id='outlined-age-simple'
            />
          }
        >
          {options.map((e, i) => <MenuItem key={i} style={{'color': '#0d47a1'}} value={e}>{e}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }
}

export default connect(null, {changeSearchParams})(DropDownFilter)