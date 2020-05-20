import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Button} from 'antd'

import {deleteUserAction} from '../../redux/actions/loginAction.js'

@connect(
  state => ({userInfo: state.userInfo}),
  {deleteUserAction}
)
class Admin extends Component {
  logOut = () => {
    this.props.deleteUserAction()
  }
  render () {
    if (!this.props.userInfo.isLogin) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        hello,{this.props.userInfo.user}
        <Button type="primary" onClick= {this.logOut}>退出登录</Button>
      </div>
    )
  }
}

export default Admin