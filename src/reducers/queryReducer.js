import {ADD_SEARCH_TERM, REMOVE_SEARCH_TERM, CHANGE_SELECTED_FILTER, searchBarFilters, NEW_QUERY} from "../constants"

const selectedFilters = {
  "Match": "All",
  "Display": "Works",
  "Ranking": "Default"
}

const terms = ["murder"]

const queryReducer = (state={searchBarFilters, selectedFilters, terms}, {type, payload}) => {
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

  default:
    return state
  }
}

export default queryReducer