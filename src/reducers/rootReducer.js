import {combineReducers} from 'redux'

import queryReducer from './queryReducer'
import filterReducer from './filterReducer'
import resultReducer from './resultReducer'

const rootReducer = combineReducers({
  query: queryReducer,
  filter: filterReducer,
  result: resultReducer
})

export default rootReducer