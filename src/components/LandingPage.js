import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {TextField, IconButton} from '@material-ui/core'

class LandingPage extends Component {

  state = {
    searchTerm: ''
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyClick)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyClick)
  }

  handleChange = (e) => {
    this.setState({searchTerm: e.target.value})
  }

  handleKeyClick = ({key}) => {
    const {searchTerm} = this.state
    if(searchTerm && key === "Enter") this.handleSearch(searchTerm)
  }

  handleSearch = (searchTerm) => {
    window.location.assign(`/search?query=${searchTerm}`)
  }

  render() {
    return (
      <div style={{
        'backgroundImage': 'url(http://dijon.idi.ntnu.no/bibsurf/static/media/background.68916550.jpg)',
        'display': 'flex',
        'justifyContent': 'center',
        'alignItems': 'center',
        'objectFit': 'contain',
        'height': '500px'}}
      >
        <div style={{'backgroundColor': 'white', 'padding': '20px'}}>
          <div>
            <TextField
              value={this.state.searchTerm}
              onChange={this.handleChange}
              label='Search'
              variant='outlined'
              style={{'width': '750px'}}
            />
            <IconButton aria-label='Search'>
              <Link to={`search?query=${this.state.searchTerm}`}>Submit</Link>
            </IconButton>
          </div>
        </div>
      </div>
    )
  }
}

export default LandingPage