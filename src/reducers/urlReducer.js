export const urlReducer = (state={url:''}, action) => {
  switch (action.type) {
  case "CHANGE_URL":
    return {url: action.payload}
  default: return state
  }
}

export default urlReducer