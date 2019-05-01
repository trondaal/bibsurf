import {NEW_URL, CHANGE_DISPLAY} from "../constants"

const url = null

const queryReducer = (state={url}, {type, payload}) => {
  switch (type) {
  case NEW_URL:
    return {
      ...state,
      url: payload
    }
  case CHANGE_DISPLAY:
    return {
      ...state,
      url: payload
    }
  default:
    return state
  }
}

export default queryReducer