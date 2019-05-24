import {INIT_SEARCH,
  NEW_QUERY,
  GET_RELATED_WORKS,
  GET_NEXT,
  NO_RESULTS,
  CHANGE_DISPLAY,
  ONE_RESULT,
  GET_DETAILS_OF_MANIFESTATION
} from '../constants'

const initState = {
  results: [],
  related: [],
  manifestationsDetails: []
}

const resultReducer = (state = initState, {type, payload}) => {
  switch (type) {
  case INIT_SEARCH:
    return {
      ...state,
      loading: true
    }
  case NEW_QUERY:
    return {
      ...state,
      results: [...payload.results],
      next: payload.next,
      categories: payload.categories,
      roles: payload.roles,
      resultSize: payload.resultsize,
      loading: false
    }

  case ONE_RESULT:
    return {
      ...state,
      results: [payload.results],
      next: payload.next,
      categories: payload.categories,
      roles: payload.roles,
      resultSize: payload.resultsize,
      loading: false
    }

  case GET_RELATED_WORKS:
    return {
      ...state,
      related: [...state.related, payload]
    }
  case GET_NEXT:
    return{
      ...state,
      results: [...state.results, ...payload],
      loading: false
    }
  case NO_RESULTS:
    return {...state, loading: false}

  case CHANGE_DISPLAY:
    return initState
  case GET_DETAILS_OF_MANIFESTATION:
    return {
      ...state,
      manifestationsDetails: [...state.manifestationsDetails, payload]
    }
  default:
    return state
  }
}

export default resultReducer
