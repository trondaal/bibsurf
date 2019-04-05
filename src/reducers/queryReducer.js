import {ADD_SEARCH_TERM, REMOVE_SEARCH_TERM, CHANGE_SELECTED_FILTER, NEW_URL, CHANGE_DISPLAY} from "../constants"

const selectedFilters = {
  "Match": "All",
  "Display": "Works",
  "Ranking": "Default"
}

const terms = []

const url = null

const queryReducer = (state={selectedFilters, terms, url}, {type, payload}) => {
  const newState = {...state}
  switch (type) {
  case ADD_SEARCH_TERM:{
    newState.terms = [...newState.terms, payload]

    return {...newState}
  }

  case REMOVE_SEARCH_TERM:{
    newState.terms = newState.terms.filter(t => t !== payload)
    return {...newState}
  }

  case CHANGE_SELECTED_FILTER:{
    const key = Object.keys(payload)
    newState.selectedFilters[key] = payload[key]
    return {...newState}
  }
  case NEW_URL:
    return {
      ...state,
      url: payload
    }
  case CHANGE_DISPLAY:
    return {
      ...state,
      url: payload
    }
  default:
    return state
  }
}

export default queryReducer