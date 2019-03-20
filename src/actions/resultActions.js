import {INIT_SEARCH, NEW_QUERY, BASE_URL} from '../constants'
import {capitalize} from '../utils'

export const newQuery = (terms, {Match, Display, Ranking}) => async dispatch => {
  dispatch({
    type: INIT_SEARCH
  })
  const query = terms ? terms.map(e => e.replace(" ", "%20")).join("%20") : ""
  const url = `${BASE_URL}query=${query}&querytype=${capitalize(Match)}&displaytype=${capitalize(Display)}&subcollection=&rankingtype=${capitalize(Ranking)}&categories={}&roles={}&filtermethod=&subtree=false`
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