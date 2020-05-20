import {SAVE_USER, DELETEUSERACTION} from '../actions-type'

let _user = localStorage.getItem('user')
let _id = localStorage.getItem('_id')

let initState = {
  user: _user || '',
  id: _id || '',
  isLogin: _user &&  _id
}

function loginReducer (state = initState, action) {
  switch (action.type) {
    case SAVE_USER: 
      return {
        user: action.data.username,
        _id: action.data._id,
        isLogin: true
      }
    case DELETEUSERACTION:
       return {
        user: '',
        _id: '',
        isLogin: false
      }
    default:
      return state
  }
}

export default loginReducer