import {INIT_SEARCH, NEW_QUERY} from '../constants'


const resultReducer = (state={}, action) => {
  switch(action.type){
  case INIT_SEARCH:
    return {
      ...state,
      loading: true
    }
  case NEW_QUERY:
    return action.payload.results ? {
      results: [...action.payload.results],
      next: action.payload.next,
      loading: false
    }
      : {
        results: [],
        next: "",
        loading: true
      }
  default:
    return state
  }
}

export default resultReducer