
import React, {Component} from 'react'
import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (

      <div>gjgjgj</div>

    )
  }
}

const mapStateToProps = (state) => (
  {
    query: state.query,
    filter: state.filter
  }
)


export default connect(mapStateToProps)(App)
