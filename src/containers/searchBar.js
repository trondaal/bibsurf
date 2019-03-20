import React, {Component} from 'react'

import {connect} from 'react-redux'
import SelectFilter from '../components/selectFilter'
import {TextField, Chip, IconButton} from '@material-ui/core'
import {addSearchTerm, removeSearchTerm, changeSelectedFilter, newQuery} from '../actions'

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

  handleSearch = async (searchTerm) => {
    if(searchTerm){
      await this.props.addSearchTerm(searchTerm)
      this.props.newQuery(this.props.terms, this.props.selectedFilters)
      this.setState({currentSearch: ""})
    }
  }


  createLists = (filters) => Object.keys(filters).map((item, i) =>
    <SelectFilter name={item} options={filters[item]} key={i} changeSelectedFilter={this.props.changeSelectedFilter} />)

  createChips = terms =>
    terms.map((term, i) =>
      <Chip key={i} label={term} variant='outlined' color='primary' onDelete={() => this.props.removeSearchTerm(term)} />)


  render() {
    const {filter, terms} = this.props
    const {currentSearch} = this.state
    return (
      <div>
        {this.createChips(terms)}
        <TextField
          value={currentSearch}
          onChange={this.handleChange('currentSearch')}
          label='Search'
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

export default connect(mapStateToProps, {newQuery, addSearchTerm, removeSearchTerm, changeSelectedFilter})(SearchBar)