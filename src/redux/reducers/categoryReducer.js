import {SAVE_CATEGORY} from '../actions-type'

let initState = []

function categoryReducer (state=initState, action) {
  switch (action.type) {
    case SAVE_CATEGORY:
      return action.data
    default:
      return state
  }
}

export default categoryReducer