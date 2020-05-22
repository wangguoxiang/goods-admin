import React, {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Layout} from 'antd'

import CheckLogin from '../check_login'
import Header from './header'
import LeftNav from './left-nav'
import Home from '../../components/home'
import Category from '../category'
import Product from '../product'
import User from '../user'
import Role from '../role'
import Bar from '../bar'
import Line from '../line'
import Pie from '../pie'

import './css/admin.less'

const {Footer, Sider, Content } = Layout;

@CheckLogin
class Admin extends Component {

  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  render () {
    return (
    <Layout id="admin">
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header />
        <Content className="content">
          <Switch>
            <Route path='/admin/home' component={Home} />
            <Route path='/admin/prod_about/category' component={Category} />
            <Route path='/admin/prod_about/product' component={Product} />
            <Route path='/admin/user' component={User} />
            <Route path='/admin/role' component={Role} />
            <Route path='/admin/charts/bar' component={Bar} />
            <Route path='/admin/charts/line' component={Line} />
            <Route path='/admin/charts/pie' component={Pie} />
            <Redirect to='/admin/home' />
          </Switch>
        </Content>
        <Footer className="footer">
          用户可以通过不同的权限进行商品管理，管理员拥有最高权限
        </Footer>
      </Layout>
    </Layout>
    )
  }
}

export default Admin