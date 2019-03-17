import {ADD_SEARCH_TERM, CHANGE_SELECTED_FILTER, REMOVE_SEARCH_TERM} from "../constants"

export const addSearchTerm = payload => ({type: ADD_SEARCH_TERM, payload})

export const removeSearchTerm = payload => ({type: REMOVE_SEARCH_TERM, payload})

export const changeSelectedFilter = payload => ({type: CHANGE_SELECTED_FILTER, payload})

export const getData = (terms, {Match, Display, Ranking}) => {
  return async dispatch => {
    console.log(terms)
    console.log("-------------------------")
    console.log(Match, Display, Ranking)
    const BASE_URL = "http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?"
    const term = "murder"
    const response = await fetch(`${BASE_URL}query=${term}&querytype=all&displaytype=works&subcollection=&rankingtype=default&categories={}&roles={}&filtermethod=&subtree=false`)
    const json = await response.json()
    dispatch({type: "DATA_LOADED", payload: json})
  }
}

// TODO: Gjør selectedFilters om til små bokstaver. Kapitaliser første bokstav ved bruk