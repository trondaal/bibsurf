import {ADD_SEARCH_TERM, REMOVE_SEARCH_TERM, CHANGE_SELECTED_FILTER, searchBarFilters} from "../constants"

const selectedFilters = {
  "Match": "All",
  "Display": "Works",
  "Ranking": "Default"
}

const terms = []

const queryReducer = (state={searchBarFilters, selectedFilters, terms}, {type, payload}) => {
  switch (type) {
  case ADD_SEARCH_TERM:{
    const newState = {...state}
    newState.terms = [...newState.terms, payload]
    return {...newState}
  }

  case REMOVE_SEARCH_TERM:{
    const newState = {...state}
    newState.terms = newState.terms.filter(t => t !== payload)
    return {...newState}
  }

  case CHANGE_SELECTED_FILTER:{
    console.log(payload)
    const newState = {...state}
    const key = Object.keys(payload)
    newState.selectedFilters[key] = payload[key]
    return {...newState}
  }

  default:
    return state
  }
}

export default queryReducer