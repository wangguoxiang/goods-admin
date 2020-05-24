import {SAVE_TITLE} from '../actions-type'

let initState = ''

function menuTitleReducer (state= initState, action) {
  switch(action.type) {
    case SAVE_TITLE:
      return action.data
    default:
      return state
  }
}

export default menuTitleReducer