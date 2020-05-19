import React, {Component} from 'react'
import {Form, Input, Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import './css/login.less'
import logo from './images/logo5.png'

const {Item} = Form

export default class Login extends Component {

  // 自定义校验
  validator = (rule, value) => {
    if (value === '') {
      return Promise.reject('请输入密码')
    } else if (value.length < 4) {
      return Promise.reject('密码输入大于等于4位')
    } else if (value.length > 12) {
      return Promise.reject('密码输入小于等于12位')
    } else if (!/^[a-zA-Z0-9\._]*$/.test(value)) {
      return Promise.reject('除了字母数字下划线小数点外不包含其他特殊字符')
    }
    return Promise.resolve()  
  }

  // 收集数据
  onFinish = (value) =>{
    console.log(value)
  }
  render () {
    return (
      <div id="login">
        <div className="header">
          <img src={logo} alt="logo"/> <h1>商品后台管理系统</h1>
        </div>
        <div className="content">
          <Form onFinish={this.onFinish}>
          <Item
          name="username"
          rules={[
            { required: true, message: '请输入用户名！' },
            { min: 4, message: '用户名输入大于等于4位'},
            { max: 12, message: '密码输入小于等于12位'},
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