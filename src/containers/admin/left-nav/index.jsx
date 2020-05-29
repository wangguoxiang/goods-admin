import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {Menu} from 'antd'

import {saveTitleAction} from '../../../redux/actions/saveTitleAction.js'
import menuList from '../../../config/menuConfig.js'
import './left-nav.less'
import Logo from './images/logo.jpg'

const { SubMenu, Item} = Menu

@connect(
  state => ({roleMenus: state.userInfo.user.role.menus, username: state.userInfo.user.username}),
  {saveTitleAction}
)
@withRouter
class LeftNav extends Component {

  // 权限校验
  AuthCheck = (item) => {
/*     const {roleMenus} = this.props
    return menuList.map((item)=>{
      if (item.children instanceof Array) {
        return item.children.find((itemChild) => roleMenus.indexOf(itemChild.key) !== -1 )
      } else {
        return roleMenus.indexOf(item.key) !== -1
      }
    }) */
    const {roleMenus} = this.props
    if (this.props.username === 'admin') {
      return true
    }else if (item.children) {
      return item.children.find((itemChild)=> roleMenus.indexOf(itemChild.key) !== -1)
    } 
    else {
      return roleMenus.indexOf(item.key) !== -1
    }
  }

  // 获取菜单
  getMenuList = (menuList) => {
     // eslint-disable-next-line
      return menuList.map((item)=>{
        if (this.AuthCheck(item)) {
          if (item.children instanceof Array) {
            return (
            <SubMenu key={item.key} icon= {<item.icon/>} title={item.title}>
              {this.getMenuList(item.children)}
            </SubMenu>
            )
          } else {
            return (
              <Item key={item.key} icon={< item.icon/>} onClick={()=>{this.props.saveTitleAction(item.title)}}>
                <Link to={item.path}>{item.title}</Link>
              </Item>
            )
          }
        }
      })
    
  }
  render() {
    const {pathname} = this.props.history.location
    let selectKey = this.props.history.location.pathname.split('/').reverse()[0]
    let openKey = this.props.history.location.pathname.split('/').reverse()[1]
    if (pathname.indexOf ('/admin/prod_about/product')!== -1) {
      selectKey = 'product'
      openKey = 'prod_about'
    }
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