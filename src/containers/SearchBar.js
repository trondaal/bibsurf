import React, {Component} from 'react'
import {connect} from 'react-redux'
import {TextField, Chip, IconButton} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import {dropDownFilters as filter} from '../constants'
import DropDownFilter from '../components/DropDownFilter'
import {addSearchTerm, removeSearchTerm, changeSelectedFilter, newQuery} from '../actions'
import {changeSearchParams} from '../actions/queryActions'

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
    const newTerms = this.props.url.get('query').split(' ').filter(queryTerm => queryTerm !== term)
    this.props.changeSearchParams(this.props.url.toString(), 'query', newTerms.join(' '))
  }

  handleSearch = () => {
    if(this.state.currentSearch){
      const currentQuery = this.props.url.get('query')
      const newQuery = currentQuery === null ? this.state.currentSearch : `${currentQuery} ${this.state.currentSearch}`
      this.props.changeSearchParams(this.props.url.toString(), 'query', newQuery)
      this.setState({currentSearch: ""})
    }
  }

  createLists = (filters) => Object.keys(filters).map((item, i) =>
    <DropDownFilter name={item} options={filters[item]} key={i} url={this.props.url} changeSelectedFilter={this.props.changeSelectedFilter} />)

  createChips = () => (
    this.props.url.get('query').split(' ').map((term, i) => term ?
      <Chip key={i} label={term} variant='outlined' color='primary' onDelete={() => this.removeSearchTerm(term)} />
      : null)
  )


  render() {
    const queryTerms = this.props.url.get('query')
    const {terms} = this.props
    const {currentSearch} = this.state
    return (
      <div className='navr'>
        <div className='chips'>
          {queryTerms !== null && this.createChips(terms)}
        </div>
        <TextField
          className='hitme'
          value={currentSearch}
          onChange={this.handleChange('currentSearch')}
          label='Search'
          variant='outlined'
        />
        <IconButton aria-label='Search'
          onClick={() => this.handleSearch()}
        >
          Submit
          <SearchIcon id='search-spinner' />
        </IconButton>
        <div className='dropdown-filters'>
          {this.createLists(filter)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    selectedFilters: state.query.selectedFilters,
    terms: state.query.terms
  }
)

export default connect(mapStateToProps, {newQuery, addSearchTerm, removeSearchTerm, changeSelectedFilter, changeSearchParams})(SearchBar)