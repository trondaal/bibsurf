import React, {Component} from 'react'
import {connect} from 'react-redux'
import {clearFilters} from '../../actions/queryActions'

import {FilterCard, FilterOption} from '.'


class FilterList extends Component {


  clearFilters = () => {
    this.props.clearFilters(this.props.url)
  }

  render() {
    const {categories, roles} = this.props
    return (
      <div>
        <FilterOption title='Filter options' options={{AND: '', OR: '', ANDOR: ''}} url={this.props.url} />
        {categories && Object.entries(categories).map((e,i) => <FilterCard key={i} title={e[0]} options={e[1]} filterType='categories' url={this.props.url} />)}
        {roles && Object.entries(roles).map((e,i) => <FilterCard key={i} title={e[0]} options={e[1]} filterType='roles' url={this.props.url} />)}
        <button onClick={this.clearFilters}>Clear Filters</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => (
  {
    categories: state.result.categories,
    roles: state.result.roles
  }
)

export default connect(mapStateToProps, {clearFilters})(FilterList)