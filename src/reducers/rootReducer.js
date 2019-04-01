import {combineReducers} from 'redux'

import queryReducer from './queryReducer'
import filterReducer from './filterReducer'
import resultReducer from './resultReducer'
import urlReducer from './urlReducer'

const rootReducer = combineReducers({
  query: queryReducer,
  filter: filterReducer,
  result: resultReducer,
  url: urlReducer
})

export default rootReducer