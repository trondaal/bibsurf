import {INIT_SEARCH,
  NEW_QUERY,
  GET_RELATED_WORKS,
  API_URL,
  GET_NEXT,
  BASE_URL,
  NO_RESULTS,
  ONE_RESULT,
  defaultSearchParams} from '../constants'
import axios from 'axios'


export const newQuery = url => async dispatch => {
  dispatch({
    type: INIT_SEARCH
  })
  const searchURL = new URLSearchParams(`?${url}`)
  Object.entries(defaultSearchParams).forEach( param => {
    if(searchURL.get(param[0]) === null) {
      searchURL.set(param[0], param[1])
    }
  })
  const query = `${BASE_URL}${searchURL.toString()}`
  const response = await fetch(query)
  const json = await response.json()
  console.log(json)
  if(json.results === null){
    return (
      dispatch({
        type: NO_RESULTS
      })
    )
  }
  if(json.results.length === undefined) {
    return dispatch({
      type: ONE_RESULT,
      payload: json
    })
  }
  return (
    dispatch({
      type: NEW_QUERY,
      payload: json
    })
  )
}

export const getNext = (next) => async dispatch => {
  dispatch({type: INIT_SEARCH})
  console.log(next)
  const response = await fetch(next)
  const data = await response.json()
  console.log(data)
  if(data === null){
    dispatch({type: NO_RESULTS})
  }
  else{
    dispatch({
      type: GET_NEXT,
      payload: data
    })
  }

}

export const getRelatedWorks = (workId) => dispatch => {
  const url = `${API_URL}related.xquery?id=${workId}`
  return axios.get(url).then(res => {
    dispatch({
      type: GET_RELATED_WORKS,
      payload: {'workId': workId, relations: res.data}
    })
  }).catch(err => {
    console.log(err)
  })
}