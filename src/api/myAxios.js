import myAxios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import {BASE_URL} from '../config'

myAxios.defaults.baseURL = BASE_URL

// 请求拦截器
  myAxios.interceptors.request.use(
    config => {
      NProgress.start()
      let data = config.data
      config.data = qs.stringify(data)
      return config 
    },
    err => {
      return Promise.reject(err)
    }
  )

// 响应拦截器
  myAxios.interceptors.response.use(
    response => {
      NProgress.done()
      const result = response.data
      return result
    },
    err => {
      NProgress.done()
      message.error(err.message)
      return new Promise(()=>{})
    }
  )

export default myAxios