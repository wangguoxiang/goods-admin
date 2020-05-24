import {combineReducers} from 'redux'

import loginReducer from './loginReducer'
import menuTitleReducer from './menuTitleReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
  userInfo: loginReducer,
  title: menuTitleReducer,
  category:categoryReducer
})