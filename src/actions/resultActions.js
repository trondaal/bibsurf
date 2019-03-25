import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, API_URL, GET_NEXT} from '../constants'

import axios from 'axios'

export const newQuery = (url) => dispatch => {
  dispatch({
    type: INIT_SEARCH
  })
  return (
    axios.get(url).then(res => {
      dispatch({
        type: NEW_QUERY,
        payload: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  )
}

export const getNext = (next) => dispatch => {
  return axios.get(next).then(res => {
    console.log(res.data)
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