import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {Menu} from 'antd'

import menuList from '../../../config/menuConfig.js'
import './left-nav.less'
import Logo from './images/logo.jpg'

const { SubMenu, Item} = Menu

@withRouter
class LeftNav extends Component {

  getMenuList = (menuList) => {
    return menuList.map((item)=>{
      if (item.children instanceof Array) {
        return (
        <SubMenu key={item.key} icon= {<item.icon/>} title={item.title}>
          {this.getMenuList(item.children)}
        </SubMenu>
        )
      } else {
        return (
          <Item key={item.key} icon={< item.icon/>}>
            <Link to={item.path}>{item.title}</Link>
          </Item>
        )
      }
    })
  }
  render() {
    const selectKey = this.props.history.location.pathname.split('/').reverse()[0]
    const openKey = this.props.history.location.pathname.split('/').reverse()[1]
    return(
      <div>
        <div className="nav-header">
          <img src={Logo} alt="logo"/>
          <h1>商品后台</h1>
        </div>
        <Menu 
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {this.getMenuList(menuList)}
        </Menu>
      </div>
    )
  }
}

export default LeftNav