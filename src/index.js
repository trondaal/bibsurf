import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/rootReducer'
import Root from './Root'

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(rootReducer, allStoreEnhancers)

ReactDOM.render(<Provider store={store}><Root /></Provider>, document.getElementById('root'))