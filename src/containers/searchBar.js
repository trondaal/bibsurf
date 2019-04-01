import React, {Component} from 'react'

import {connect} from 'react-redux'
import {TextField, Chip, IconButton} from '@material-ui/core'

import {dropDownFilters as filter} from '../constants'
import DropDownFilter from '../components/DropDownFilter'
import {addSearchTerm, removeSearchTerm, changeSelectedFilter, newQuery} from '../actions'
import {urlChanged} from '../actions/queryActions'

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
    console.log(term)
    const newTerms = this.props.url.get('query').split(' ').filter(queryTerm => queryTerm !== term)
    console.log(newTerms.join(' '))
    this.props.url.set('query', newTerms.join(' '))
    this.props.urlChanged(true)
  }

  handleSearch = () => {

    if(this.state.currentSearch){
      /*await this.props.addSearchTerm(searchTerm)
      this.props.newQuery(this.props.terms, this.props.selectedFilters)*/
      const currentQuery = this.props.url.get('query')
      const newQuery = currentQuery === null ? this.state.currentSearch : `${currentQuery} ${this.state.currentSearch}`

      this.setState({currentSearch: ""})
      this.props.url.set('query', newQuery)

      this.props.urlChanged(true)
    }
  }

  createLists = (filters) => Object.keys(filters).map((item, i) =>
    <DropDownFilter name={item} options={filters[item]} key={i} url={this.props.url} changeSelectedFilter={this.props.changeSelectedFilter} />)

  createChips = () => (
    this.props.url.get('query').split(' ').map((term, i) =>
      <Chip key={i} label={term} variant='outlined' color='primary' onDelete={() => this.removeSearchTerm(term)} />)
  )


  render() {
    const queryTerms = this.props.url.get('query')
    const {terms} = this.props
    const {currentSearch} = this.state
    return (
      <div>
        {queryTerms !== null && this.createChips(terms)}
        <TextField
          value={currentSearch}
          onChange={this.handleChange('currentSearch')}
          label='Search'
          variant='outlined'
        />
        <IconButton aria-label='Search'
          onClick={() => this.handleSearch()}
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
    selectedFilters: state.query.selectedFilters,
    terms: state.query.terms,
    urlTerms: state.query.urlTerms
  }
)

export default connect(mapStateToProps, {newQuery, addSearchTerm, removeSearchTerm, changeSelectedFilter, urlChanged})(SearchBar)