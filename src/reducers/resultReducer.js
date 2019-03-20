import {INIT_SEARCH, NEW_QUERY} from '../constants'


const resultReducer = (state={}, action) => {
  switch(action.type){
  case INIT_SEARCH:
    return {
      ...state,
      loading: true
    }
        case NEW_QUERY:
            return {
                results: [...action.payload.results],
                next: action.payload.next,
                loading: false
            }
        default:
            return state
    }
}

export default resultReducer