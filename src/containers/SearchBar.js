import React, {Component} from 'react'
import {connect} from 'react-redux'
import {dropDownFilters as filter} from '../constants'
import DropDownFilter from '../components/DropDownFilter'
import {changeSearchParams} from '../actions'

import {TextField, Chip, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

class SearchBar extends Component {
  state = {
    currentSearch: ""
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyClick)
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyClick)
  }

  handleKeyClick = ({key}) => {
    const {currentSearch} = this.state
    if(currentSearch && key === "Enter") this.handleSearch(currentSearch)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  removeSearchTerm = term => {
    const {url} = this.props
    const newTerms = url.get('query').split(' ').filter(queryTerm => queryTerm !== term)
    this.props.changeSearchParams(url.toString(), 'query', newTerms.join(' '))
  }

  handleSearch = () => {
    const {props: {url}, state: {currentSearch}} = this
    if(currentSearch){
      const currentQuery = url.get('query')
      const newQuery = currentQuery === null ? currentSearch : `${currentQuery} ${currentSearch}`
      this.props.changeSearchParams(url.toString(), 'query', newQuery)
      this.setState({currentSearch: ""})
    }
  }

  createLists = filters => Object.keys(filters).map((item, i) =>
    <DropDownFilter name={item} options={filters[item]} key={i} url={this.props.url} changeSelectedFilter={this.props.changeSelectedFilter} />)

  createChips = () => (
    this.props.url.get('query').split(' ').map((term, i) => term ?
      <Chip style={{color: '#bbdefb', borderColor: '#bbdefb'}}key={i} label={term} variant='outlined' color='primary' onDelete={() => this.removeSearchTerm(term)} />
      : null)
  )


  render() {
    const queryTerms = this.props.url.get('query')
    const {terms} = this.props
    const {currentSearch} = this.state
    return (
      <div className='navbar-container'>
        <div className='chips'>
          {queryTerms && this.createChips(terms)}
        </div>
        <TextField
          className='search-input'
          value={currentSearch}
          onChange={this.handleChange('currentSearch')}
          label='Search'
          variant='outlined'
        />
        <IconButton aria-label='Search'
          style={{'color': '#bbdefb'}}
          onClick={this.handleSearch}
        >
          Submit
          <SearchIcon id='search-spinner' style={{color: '#bbdefb'}} />
        </IconButton>
        <div className='dropdown-filters'>
          {this.createLists(filter)}
        </div>
      </div>
    )
  }
}

export default connect(null, {changeSearchParams})(SearchBar)