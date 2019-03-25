import {combineReducers} from 'redux'

import queryReducer from './queryReducer'
import categoryReducer from './categoryReducer'
import resultReducer from './resultReducer'

const rootReducer = combineReducers({
  query: queryReducer,
  category: categoryReducer,
  result: resultReducer
})

export default rootReducer