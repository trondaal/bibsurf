import React, {Component} from 'react'

import {connect} from 'react-redux'
import SelectFilter from '../components/selectFilter'
import {TextField, Chip, IconButton} from '@material-ui/core'
import {getData, addSearchTerm, removeSearchTerm, changeSelectedFilter} from '../actions'

class SearchBar extends Component {
  state = {
    currentSearch: ""
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyClick)
    this.props.getData(this.props.terms, this.props.selectedFilters)
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

  handleTermDelete = term => {
    this.props.removeSearchTerm(term)
  }

  handleSearch = searchTerm => {
    if(searchTerm){
      this.props.addSearchTerm(searchTerm)
      this.setState({currentSearch: ""})
    }
  }


  createLists = (filters) => Object.keys(filters).map((item, i) =>
    <SelectFilter name={item} options={filters[item]} key={i} changeSelectedFilter={this.props.changeSelectedFilter} />)

  createChips = terms =>
    terms.map((term, i) =>
      <Chip key={i} label={term} variant='outlined' color='primary' onDelete={() => this.handleTermDelete(term)} />)


  render() {
    const {filter, terms} = this.props
    const {currentSearch} = this.state
    return (
      <div>
        {this.createChips(terms)}
        <TextField
          value={currentSearch}
          onChange={this.handleChange('currentSearch')}
          label='search'
          variant='outlined'
        />
        <IconButton aria-label='Search'
          onClick={() => this.handleSearch(currentSearch)}
        >
          Submit
        </IconButton>
        {this.createLists(filter)}
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    filter: state.query.searchBarFilters,
    selectedFilters: state.query.selectedFilters,
    terms: state.query.terms
  }
)

export default connect(mapStateToProps, {getData, addSearchTerm, removeSearchTerm, changeSelectedFilter})(SearchBar)