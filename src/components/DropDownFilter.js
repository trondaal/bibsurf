import React, {Component} from 'react'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

class DropDownFilter extends Component {
  state = {
    selected: this.props.options[0]
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    this.props.changeSelectedFilter({[this.props.name]: event.target.value})
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
          value={selected}
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

export default DropDownFilter