import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, API_URL, GET_NEXT, BASE_URL, NO_RESULTS} from '../constants'
import axios from 'axios'
import {capitalize} from '../utils'

export const newQuery = url => async dispatch => {
  dispatch({
    type: INIT_SEARCH
  })
  const query = `${BASE_URL}${url}`
  const response = await fetch(query)
  const json = await response.json()

  if(json.results === null){
    return (
      dispatch({
        type: NO_RESULTS
      })
    )
  }
  return (
    dispatch({
      type: NEW_QUERY,
      payload: json
    })
  )
}

export const getNext = (next) => dispatch => {
  return axios.get(next).then(res => {
    dispatch({
      type: GET_NEXT,
      payload: res.data
    })
  })
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