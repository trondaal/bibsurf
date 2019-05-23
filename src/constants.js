export const dropDownFilters = {
  Match: ['All', 'Any', 'Phrase', 'Near'],
  Display: ['Works', 'Expressions', 'Manifestations' ],
  Ranking: ['Default', 'Entity hits', 'Publications #'],
  Subtree: ['False', 'True']
}

export const dropDownFiltersTranslated = {
  Match: 'querytype',
  Display: 'displaytype',
  Ranking: 'rankingtype',
  Subtree: 'subtree'
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

export const defaultSearchParams = {
  'displaytype': 'works',
  'querytype': 'all',
  'subcollection': '',
  'rankingtype': 'default',
  'filtermethod': '',
  'subtree': 'false',
  'categories': '{}',
  'roles': '{}'
}

export const listRoles = [
  'actor', 'artist', 'author', 'editor', 'composer',
  'contributor', 'director', 'interviewee', 'interviewer', 'lyricist',
  'screenwriter', 'producer', 'abridger', 'adapter', 'conductor',
  'narrator', 'performer', 'translator'
]

/**
 * @key {returned value from API}
 * @value {material UI icon}
 */
export const carrierTypeToIcon = {
  "book": "book",
  "novel": "book",
  "audio book": "headset",
  "video": "local_movies"
}

/**
 * Defines the order of fields to include in a manifestation, if they exsist
 */
export const manifestationFields = [
  // Should figure out how to apply separators through css
  // [prepend separator, fieldType, append seperator]

  // First line
  [["", "titleProper", " "], ["/", "statementOfResponsibility", ""]],
  // Type (first line)
  [["[", "mediaType", " "], ["- ", "carrierType", "]"]],
  // Second line
  [
    ["", "placeOfPublication", ""],
    [":", "publisher", ""],
    [",", "dateOfPublication", "."],
    ["", "extent", " "],
    ["", "dimensions", " "],
    ["ISBN","identifierForTheManifestation", ""]
  ]
]

export const BASE_URL = "http://dijon.idi.ntnu.no/exist/rest/db/bibsurfbeta/xql/search.xquery?"
export const ADD_SEARCH_TERM = "ADD_SEARCH_TERM"
export const REMOVE_SEARCH_TERM = "REMOVE_SEARCH_TERM"
export const CHANGE_SELECTED_FILTER = "CHANGE_SELECETD_FILTER"
export const INIT_SEARCH = 'INIT_SEARCH'
export const SEARCH_SUCCESFULL = 'SEARCH_SUCCESFULL'
export const API_URL = 'http://dijon.idi.ntnu.no//exist/rest/db/bibsurfbeta/xql/'
export const NEW_QUERY = 'NEW_QUERY'
export const FILTER_CHANGED = "FILTER_CHANGED"
export const UPDATE_SIDEBAR_FILTERS = "UPDATE_SIDEBAR_FILTERS"
export const GET_NEXT = 'GET_NEXT'
export const GET_RELATED_WORKS = 'GET_RELATED_WORKS'
export const URL_CHANGED = "URL_CHANGED"
export const NO_RESULTS = "NO_RESULTS"
export const CHANGE_DISPLAY ="CHANGE_DISPLAY"
export const NEW_URL = "NEW_URL"
export const ONE_RESULT = "ONE_RESULT"
export const GET_DETAILS_OF_MANIFESTATION = "GET_DETAIL_OF_MANIFESTATION"