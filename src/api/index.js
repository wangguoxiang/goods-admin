import myAxios from './myAxios'

// 请求登录接口
export const reqLogin = (loginObj) => myAxios.post('/login',loginObj)