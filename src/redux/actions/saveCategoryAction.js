import {SAVE_CATEGORY} from '../actions-type'
import {reqCategoryList} from '../../api'
import {message} from 'antd'

export const saveCategoryAction = (data) =>{
  return {
    type: SAVE_CATEGORY,
    data
  }
}


export const saveCategoryActionAsync = () =>{
  return async (dispatch) => {
    let categoryListResult = await reqCategoryList()
    const {status, data} = categoryListResult
    if (status === 0) {
      dispatch(saveCategoryAction(data.reverse()))
    } else {
      message.error('获取分类列表失败')
    }
  }
}