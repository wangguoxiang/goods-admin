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

// 更新分类
export const reqUpdateCategoty = (categoryId, categoryName) => myAxios.post('manage/category/update',{categoryId, categoryName})

// 获取商品列表
export const reqProductList = (pageNum, pageSize) => myAxios.get('manage/product/list',{params:{pageNum, pageSize}})

// 根据名称或描述搜索商品
export const reqProduct = ({pageNum,pageSize,searchName,searchType}) => myAxios.get('/manage/product/search',
{params:{pageNum,pageSize,[searchType]:searchName}})

// 对商品进行上架/下架处理
export const reqProductUpdate = (productId,status) => myAxios.post('/manage/product/updateStatus',{productId,status})

// 删除上传图片
export const reqRemovedPicture = (name) => myAxios.post('/manage/img/delete',{name})

// 添加商品
export const reqAddProduct = ({categoryId,name,desc,price,detail,imgs}) => 
  myAxios.post('/manage/product/add',{categoryId,name,desc,price,detail,imgs})

// 根据分类Id获取分类名称
export const reqCategoty = (categoryId) => myAxios.get('/manage/category/info',{params:{categoryId}})

// 根据商品Id获取商品
export const reqProductDetail = (productId) => myAxios.get('/manage/product/info',{params:{productId}})
