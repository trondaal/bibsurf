import {INIT_SEARCH, NEW_QUERY, GET_RELATED_WORKS, API_URL, GET_NEXT, BASE_URL} from '../constants'
import axios from 'axios'
import {capitalize} from '../utils'

export const newQuery = (terms, {Match, Display, Ranking}) => async dispatch => {
  dispatch({
    type: INIT_SEARCH
  })
  const query = terms ? terms.map(e => e.replace(" ", "%20")).join("%20") : ""
  const url = `${BASE_URL}query=${query}&querytype=${capitalize (Match)}&displaytype=${capitalize(Display)}&subcollection=&rankingtype=${capitalize(Ranking)}&categories={}&roles={}&filtermethod=&subtree=false`
  console.log(url)
  const response = await fetch(url)
  const json = await response.json()
  return (
    dispatch({
      type: NEW_QUERY,
      payload: json
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