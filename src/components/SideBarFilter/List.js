import React, {Component} from 'react'
import {connect} from 'react-redux'

import {FilterCard} from '.'


class FilterList extends Component {

  render() {
    const {categories, roles} = this.props
    return (
      <div>
        <FilterCard title='Filter options' options={{AND: "", OR: "", ANDOR: "", "Filter subtree": ""}} other='constant' />
        {categories && Object.entries(categories).map((e,i) => <FilterCard key={i} title={e[0]} options={e[1]} />)}
        {categories && Object.entries(roles).map((e,i) => <FilterCard key={i} title={e[0]} options={e[1]} />)}
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

export default connect(mapStateToProps, {})(FilterList)