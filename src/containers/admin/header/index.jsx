import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Button, Modal} from 'antd'
import {FullscreenOutlined, FullscreenExitOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import screenfull from 'screenfull'
import dayjs from 'dayjs'

import {reqWeaterData} from '../../../api'
import {deleteUserAction} from '../../../redux/actions/loginAction.js'
import {saveTitleAction} from '../../../redux/actions/saveTitleAction'
import menuList from '../../../config/menuConfig.js'

import './header.less'

const { confirm } = Modal

@connect(
  state => ({username: state.userInfo.user.username, title: state.title}),
  {deleteUserAction,saveTitleAction}
)
@withRouter
class Header extends Component {
  state = {
    isFullScreen: false,
    date: dayjs().format('YYYY年 MM-DD HH:mm:ss'),
    weatherData: {}
  }

  // 用户退出登录
  logOut = () => {
    confirm({
      title: '确认退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '退出登录后需重新登录',
      okText: '确认',
      cancelText: '取消',
      onOk: ()=> {
        this.props.deleteUserAction()
      }
    });
  }

  // 切换屏幕是否全屏
  switchScreenFull = () =>{
    screenfull.toggle()
  }

  // 判断屏幕状态
  checkScreenSwitch = () => {
    screenfull.on('change',()=>{
      let {isFullScreen} = this.state
      this.setState({
        isFullScreen: !isFullScreen
      })
    })
  }

  // 获取天气信息
  getWeaterData = async () => {
    let data = await reqWeaterData()
    const {dayPictureUrl, temperature,weather} = data.results[0].weather_data[0]
    this.setState({
      weatherData: {
        img: dayPictureUrl,
        weather,
        temperature
      }
    })
  }

  // 获取标题
  getTitle = (menuKey) => {
    let title = ''
    menuList.forEach((item)=>{
      if (item.children instanceof Array) {
        let result  = item.children.find((childItem)=>{
          return menuKey === childItem.key
        })
        if(result) title = result.title
      }
      if (menuKey === item.key) {
        title = item.title
      }
    })
    this.props.saveTitleAction(title)
    return title
  }

  componentDidMount () {
    this.checkScreenSwitch()
    this.dateInterval = setInterval(() => {
      this.setState({
        date: dayjs().format('YYYY年 MM-DD HH:mm:ss') 
      })
    }, 1000)
    this.getWeaterData()
  }

  componentWillUnmount () {
    clearInterval(this.dateInterval)
  }

  render () {
    let {isFullScreen,date, weatherData} = this.state
    const {username} = this.props
    const menuKey = this.props.history.location.pathname.split('/').reverse()[0]
    return(
      <div id="header">
        <div className="header-top">
         <Button size="small" type="primary" onClick={this.switchScreenFull}>
          {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
        </Button>
          <span className="text">欢迎, {username} </span>
          <Button type="link" onClick={this.logOut}>退出登录</Button>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">
            <span className="title">
              {this.props.title || this.getTitle(menuKey) }
            </span>
          </div>
          <div className="header-bottom-right">
            <span>{date}<img src={weatherData.img} alt="天气图片"/> {weatherData.weather}  温度：{weatherData.temperature}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default Header