export const dropDownFilters = {
  Match: ['All', 'Any', 'Phrase', 'Near'],
  Display: ['Works', 'Expressions', 'Manifestations' ],
  Ranking: ['Default', 'Entity hits', 'Publications #']
}

export const translations = {
  "Filter options": "Filter options",
  "m:carrierType": "Type of Carrier",
  "w:formOfWork": "Form of Work",
  "m:mediaType": "Type of Media",
  "e:languageOfExpression": "Language",
  "e:contentType": "Type of Content",
  "w:compiler": "Editor",
  "w:artist": "Artist",
  "w:author": "Author",
  "e:translator": "Translator",
  "w:director": "Director",
  "u:actor": "Actor",
  "e:narrator": "Narrator"
}

export const BASE_URL = "http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?"
export const ADD_SEARCH_TERM = "ADD_SEARCH_TERM"
export const REMOVE_SEARCH_TERM = "REMOVE_SEARCH_TERM"
export const CHANGE_SELECTED_FILTER = "CHANGE_SELECETD_FILTER"
export const INIT_SEARCH = 'INIT_SEARCH'
export const SEARCH_SUCCESFULL = 'SEARCH_SUCCESFULL'
export const NEW_QUERY = 'NEW_QUERY'
export const FILTER_CHANGED = "FILTER_CHANGED"
export const UPDATE_SIDEBAR_FILTERS = "UPDATE_SIDEBAR_FILTERS"