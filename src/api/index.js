import myAxios from './myAxios'
import jsonp from 'jsonp'
import {message} from 'antd'

import {WEATHER_BASE_UTL, WEATHER_CITY, WEATHER_AK}from '../config'

// 请求登录接口
export const reqLogin = (loginObj) => myAxios.post('/api/v1/login',loginObj)

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

// 修改商品
export const reqProductUpdateDetail = ({_id,categoryId,name,desc,price,detail,imgs}) => myAxios.post('/manage/product/update',
  {_id,categoryId,name,desc,price,detail,imgs}
)

// 获取角色列表
export const reqRoleList = () => myAxios.get('/manage/role/list')

// 创建角色
export const reqCreateRole = (roleName) => myAxios.post('/manage/role/add',{roleName})

// 角色授予权限
export const reqAuthRole = ({_id,menus,auth_name}) => myAxios.post('/manage/role/update',{_id,menus,auth_name,auth_time:Date.now()})

// 获取用户列表
export const reqUserList = () => myAxios.get('/api/v1/lists/1/10')

// 创建用户
export const reqCreateUser = ({username,password,phone,email,role_id}) => myAxios.post('/manage/user/add',{username,password,phone,email,role_id})

// 删除用户
export const reqDeleteUser = (userId) => myAxios.post('/manage/user/delete',{userId})

// 修改用户信息
export const reqUpdateUser = ({_id,username,phone,email,role_id}) => myAxios.post('/manage/user/update',{_id,username,phone,email,role_id})

// 获取验证码
export const getCaptcha = () => myAxios.get('/api/v1/captcha')

//文件上传
export const uploadFile = ({formData}) => myAxios.post('/api/v1/files/upload',{formData})

//搜索教材保存信息
export const reqBook = ({pageNum,pageSize,searchName,searchType}) => myAxios.get('/manager/book/search',{params:{pageNum,pageSize,[searchType]:searchName}})

//教材保存信息
export const reqBookList = (pageNum, pageSize) => myAxios.get('manage/book/list',{params:{pageNum, pageSize}})

//更新教材信息
export const reqBookUpdate =  (bookId,isSell) => myAxios.post('manager/book/update',{params:{bookId,isSell}})