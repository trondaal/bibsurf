import {ADD_SEARCH_TERM, REMOVE_SEARCH_TERM, CHANGE_SELECTED_FILTER, FILTER_CHANGED} from "../constants"

export const addSearchTerm = payload => dispatch => {
  dispatch({
    type: FILTER_CHANGED
  })
  return (
    dispatch({type: ADD_SEARCH_TERM, payload})
  )
}

export const removeSearchTerm = payload => ({type: REMOVE_SEARCH_TERM, payload})

export const changeSelectedFilter = payload => ({type: CHANGE_SELECTED_FILTER, payload})