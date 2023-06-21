const initialState = {
  auth: false,
  id: null,
  login: null,
  game_count: null,
  wins_count: null,
  points: null,
  role: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.payload,
      }
    case "SET_AUTH":
      return { ...state, auth: action.payload }
    case "RESET_AUTH":
      return initialState
    default:
      return state
  }
}

export default reducer
