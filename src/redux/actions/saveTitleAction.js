import {SAVE_TITLE} from '../actions-type'

export const saveTitleAction = (data) => {
  return {
    type: SAVE_TITLE,
    data
  }
}