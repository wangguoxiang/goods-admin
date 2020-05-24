import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'

import {WEATHER_BASE_UTL, WEATHER_CITY, WEATHER_AK}from '../config'

// 请求登录接口
export const reqLogin = (loginObj) => myAxios.post('/login',loginObj)

// 请求天气信息接口
export const reqWeaterData = () => {
  return new Promise((resove, reject)=>{
    jsonp(`${WEATHER_BASE_UTL}?location=${WEATHER_CITY}&output=json&ak=${WEATHER_AK}`,
    (err, data)=>{
      if (!err) {
        resove(data)
      } else {
        message.error('获取天气信息出错')
      }
    })
  })
}

// 请求分类列表
export const reqCategoryList = () => myAxios.get('/manage/category/list')

// 添加分类
export const reqAddCategory = (categoryName) => myAxios.post('/manage/category/add',{categoryName})