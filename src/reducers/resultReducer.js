import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, GET_NEXT, NO_RESULTS, CHANGE_DISPLAY, ONE_RESULT, GET_DETAILS_OF_MANIFESTATION} from '../constants'

const initState = {
  results: [],
  related: [],
  manifestationsDetails: []
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
      results: [...state.results, ...action.payload],
      loading: false
    }
  case NO_RESULTS:
    return {...state, loading: false}

  case CHANGE_DISPLAY:
    return initState
  case GET_DETAILS_OF_MANIFESTATION:
    return {
      ...state,
      manifestationsDetails: [...state.manifestationsDetails, action.payload]
    }
  default:
    return state
  }
}

export default resultReducer
