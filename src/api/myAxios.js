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
     // config.headers['Content-Type'] = 'application/json;charset=utf-8';
      let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null
      console.log(user);
      if (user) {
         //config.headers['token'] = user; // 让每个请求携带自定义token 请根据实际情况自行修改
         //let param = config.params;
        //  if(param == null)
        //  {
        //    config.params = qs.stringify("token="+ user);
        //  } 
        //  else {
        //   config.params =qs.stringify(param + "&token="+ user);
        //  }
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'brackets'})
        },
        
       }
      let data = config.data
      config.data = qs.stringify(data)
      console.log(config)
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
      if (response.data.errno === 999) {
        this.props.history.replace('/login')
        console.log("token过期");
      }
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