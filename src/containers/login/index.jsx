import React, {Component,useState} from 'react'
import {Form, Input, Button, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'

import CheckLogin from '../check_login'
import {saveUserAction} from '../../redux/actions/loginAction.js'
import {reqLogin,getCaptcha} from '../../api'
import UploadCutImage from '../../components/image/UploadCutImage';
import {BASE_URL} from '../../config'
import './css/login.less'
import logo from './images/logo5.png'


export function Imageload(props){
  const getInit = async () => {
       let v =  await getCaptcha().then(
        request=>{
          return request;
        },
        error=>{
          console.log(error)
          return 
        }
    )
    setImage(v);
 }

  const [image,setImage] = useState(getInit);

  return(<img 
  src={image}
  alt="点击刷新"
  style={{ cursor:'pointer' }}></img>);
} 


export function UseStateTest({ initialState }) {
  // 2
  let [username, changeUserName] = useState(initialState)
  // 3
  return (
    <div>
      <label style={{ display: 'block' }} htmlFor="username">username: {username}</label>
      <input type="text" name="username" onChange={e => changeUserName(e.target.value)} />
    </div>
  )

}

const {Item} = Form

@connect(
  state => ({isLogin: state.userInfo.isLogin}),
  {saveUserAction})

@CheckLogin
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
        rememberEmail: '',
        imgUrl: BASE_URL + `/api/v1/captcha?id=` + Math.random()
    };
  }
  // 自定义校验
  validator = (rule, value) => {
    if (value === '') {
      return Promise.reject('请输入密码')
    } else if (value.length < 4) {
      return Promise.reject('密码输入大于等于4位')
    } else if (value.length > 12) {
      return Promise.reject('密码输入小于等于12位')
      // eslint-disable-next-line 
    } else if (!/^[a-zA-Z0-9\._]*$/.test(value)) {
      return Promise.reject('除了字母数字下划线小数点外不包含其他特殊字符')
    }
    return Promise.resolve()  
  }

  // 收集数据
  onFinish = async (value) =>{
    let loginResult = await reqLogin(value)
    const {status} = loginResult
    if (status === 200) {

      message.success('登录成功', 1)
   
      //保存用户信息，交由redux进行管理
      console.log(loginResult.data.token);
      this.props.saveUserAction(loginResult.data.token);
      this.props.history.replace('/admin')
    } else {
      message.warning(loginResult.message, 1)
      this.getCaptcha();
    }
  }

 /**
     * 刷新验证码
     */
 getCaptcha() {
  this.setState({
      //在后面加上一个无用的参数id实现验证码刷新
      imgUrl: BASE_URL + `/api/v1/captcha?id=` + Math.random()
  });
}


  render () {
    return (
      <div id="login">
        <div className="header">
          <img src={logo} alt="logo"/> <h1>某某学校教材管理系统</h1>
        </div>
        <div className="content">
          <h2>用户登录</h2>
          <Form onFinish={this.onFinish}>
          <Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名！' },
            { min: 4, message: '用户名输入大于等于4位'},
            { max: 12, message: '密码输入小于等于12位'},
            // eslint-disable-next-line 
            { pattern: /^[a-zA-Z0-9\._]*$/, message: '除了字母数字下划线小数点外不包含其他特殊字符'}
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>}  placeholder="用户名" />
        </Item>
          <Item
          name="password"
          rules={[{validator: this.validator}]}
          >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
            autoComplete="password"
          />
        </Item>
        <Item 
        name="captcha"
        rules={[
          { required: true, message: '请输入验证码！' },
          { min: 4, message: '验证码大于等于4位'},
          { max: 4, message: '验证码小于等于4位'},
        ]}
        >
        <div style={{ display: 'flex' }}>
          <Input type="text" placeholder="验证码" className="code-input" />
            <div className="login-captcha">
              <div>
                <img src={this.state.imgUrl} key={this.state.key} />
              </div>
              <span className="change-code" onClick={this.getCaptcha.bind(this)}>换一张</span>
            </div>
        </div>
        </Item>
          <Item>
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
          </Item>
        </Form>
        </div>
      </div>
    )
  }
}

export default Login


