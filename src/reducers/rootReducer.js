import {combineReducers} from 'redux'

import queryReducer from './queryReducer'
import resultReducer from './resultReducer'


const rootReducer = combineReducers({
  query: queryReducer,
  result: resultReducer
})

export default rootReducer