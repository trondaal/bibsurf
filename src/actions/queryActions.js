import {
  NEW_URL,
  CHANGE_DISPLAY} from "../constants"

export const setSearchParams = (url) => dispatch => {
  dispatch({
    type: NEW_URL,
    payload: new URLSearchParams(url)
  })
}


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