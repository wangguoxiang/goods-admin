import React, {Component} from 'react'
import {Form, Input, Button, message} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import {connect} from 'react-redux'

import CheckLogin from '../check_login'
import {saveUserAction} from '../../redux/actions/loginAction.js'
import {reqLogin} from '../../api'

import './css/login.less'
import logo from './images/logo5.png'

const {Item} = Form

@connect(
  state => ({isLogin: state.userInfo.isLogin}),
  {saveUserAction})
@CheckLogin
class Login extends Component {

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
    if (status === 0) {
      message.success('登录成功', 1)

      //保存用户信息，交由redux进行管理
      this.props.saveUserAction(loginResult.data)


      this.props.history.replace('/admin')
    } else {
      message.warning(loginResult.msg, 1)
    }
  }
  render () {
    return (
      <div id="login">
        <div className="header">
          <img src={logo} alt="logo"/> <h1>商品后台管理系统</h1>
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


