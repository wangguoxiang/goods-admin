import React, { Component } from "react"
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

export default function (CurrentCompoent) {
  @connect(
    state => ({isLogin: state.userInfo.isLogin}),
  )
  class newnewComponent extends Component { 
/*     const {...params} = this.props
    const {pathName} = this.props.history.location */
    render () {
      const {...params} = this.props
      const {isLogin} = this.props
      const {pathname} = this.props.history.location
      // 检验规则
      if (pathname === '/login' && isLogin === true) return <Redirect to="/admin"/>
      if (pathname === '/admin' && isLogin !== true) return <Redirect to="/login"/>

      return <CurrentCompoent {...params}/>
    }
  }
  return newnewComponent
}