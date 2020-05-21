import React, {Component} from 'react'
import {Layout} from 'antd'

import CheckLogin from '../check_login'
import Header from './header'

import './css/admin.less'

const {Footer, Sider, Content } = Layout;

@CheckLogin
class Admin extends Component {
  render () {
    return (
    <Layout id="admin">
      <Sider>Sider</Sider>
      <Layout>
        <Header />
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    )
  }
}

export default Admin