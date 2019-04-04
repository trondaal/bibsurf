import {ADD_SEARCH_TERM,
  REMOVE_SEARCH_TERM,
  CHANGE_SELECTED_FILTER,
  FILTER_CHANGED,
  NEW_URL,
  CHANGE_DISPLAY} from "../constants"

export const addSearchTerm = payload => dispatch => {
  dispatch({
    type: FILTER_CHANGED
  })
  return (
    dispatch({type: ADD_SEARCH_TERM, payload})
  )
}

export const setSearchParams = (url) => dispatch => {
  dispatch({
    type: NEW_URL,
    payload: new URLSearchParams(url)
  })
}

/**
 * currentURL is the current url string
 * key is the param that changed
 * value is the new param value
 * changes the url params in props so we can change url from displaycontainer
 */
export const changeSearchParams = (currentURL, key, value) => dispatch => {
  const newURL = new URLSearchParams(`?${currentURL}`)
  if(key === 'displaytype') {
    newURL.delete('categories')
    newURL.delete('roles')
    dispatch({
      type: CHANGE_DISPLAY,
      payload: newURL
    })
  }
  newURL.set(key, value)

  dispatch({
    type: NEW_URL,
    payload: newURL
  })
}

export const changeFilterParams = (currentURL, key, value, filterType) => dispatch => {
  const newURL = new URLSearchParams(`?${currentURL.toString()}`)
  const filter = newURL.get(filterType)
  if(filter === null) {
    newURL.set(filterType, JSON.stringify({[key]: [value]}))
    return dispatch({
      type: NEW_URL,
      payload: newURL
    })
  }
  const filterObject = JSON.parse(filter)
  filterObject[key] = [value]
  newURL.set(filterType, JSON.stringify(filterObject))
  return dispatch({
    type: NEW_URL,
    payload: newURL
  })
}

export const clearFilters = (currentURL) => dispatch => {
  const newURL = new URLSearchParams(`?${currentURL.toString()}`)
  newURL.delete('roles')
  newURL.delete('categories')
  dispatch({
    type: NEW_URL,
    payload: newURL
  })
}

export const removeSearchTerm = payload => ({type: REMOVE_SEARCH_TERM, payload})

export const changeSelectedFilter = payload => ({type: CHANGE_SELECTED_FILTER, payload})