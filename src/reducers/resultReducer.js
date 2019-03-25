import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, GET_NEXT} from '../constants'

const initState = {
  results: [],
  related: []
}

const resultReducer = (state = initState, action) => {
  switch (action.type) {
  case INIT_SEARCH:
    return {
      ...state,
      loading: true,
      results: []
    }
  case NEW_QUERY:
    return {
      ...state,
      results: [...action.payload.results],
      next: action.payload.next,
      loading: false
    }
  case GET_RELATED_WORKS:
    return {
      ...state,
      related: [...state.related, action.payload]
    }
  case GET_NEXT:
    return{
      ...state,
      results: [...state.results, ...action.payload]
    }
  default:
    return state
  }
}

export default resultReducer
