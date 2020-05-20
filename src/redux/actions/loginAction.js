import {SAVE_USER, DELETEUSERACTION} from '../actions-type'

export const saveUserAction = (data) => {
  localStorage.setItem('user',data.username)
  localStorage.setItem('_id', data._id)
  return {type: SAVE_USER, data}
}

export const deleteUserAction = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('_id')
  return {type: DELETEUSERACTION}
}