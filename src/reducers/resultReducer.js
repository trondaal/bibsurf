import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, GET_NEXT, NO_RESULTS, CHANGE_DISPLAY, ONE_RESULT} from '../constants'

const initState = {
  results: [],
  related: []
}


const resultReducer = (state = initState, action) => {
  switch (action.type) {
  case INIT_SEARCH:
    return {
      ...state,
      loading: true
    }
  case NEW_QUERY:
    return {
      ...state,
      results: [...action.payload.results],
      next: action.payload.next,
      categories: action.payload.categories,
      roles: action.payload.roles,
      resultSize: action.payload.resultsize,
      loading: false
    }

  case ONE_RESULT:
    return {
      ...state,
      results: [action.payload.results],
      next: action.payload.next,
      categories: action.payload.categories,
      roles: action.payload.roles,
      resultSize: action.payload.resultsize,
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
  case NO_RESULTS:
    return initState

  case CHANGE_DISPLAY:
    return initState
  default:
    return state
  }
}

export default resultReducer
