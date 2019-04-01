import {ADD_SEARCH_TERM, REMOVE_SEARCH_TERM, CHANGE_SELECTED_FILTER, URL_CHANGED} from "../constants"
import { Action } from "rxjs/internal/scheduler/Action";

const selectedFilters = {
  "Match": "All",
  "Display": "Works",
  "Ranking": "Default"
}

const terms = []

const urlChanged = false

const queryReducer = (state={selectedFilters, terms, urlChanged}, {type, payload}) => {
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

  case URL_CHANGED:
    return {
      ...state,
      urlChanged: payload
    } 

  default:
    return state
  }
}

export default queryReducer