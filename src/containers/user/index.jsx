import React, {Component} from 'react'
import {Card, Button, Table, Modal, Form, Input ,Select, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

import {reqUserList, reqCreateUser, reqDeleteUser,reqUpdateUser} from '../../api'

const {Item} = Form
const { Option } = Select
const { confirm } = Modal

export default class User extends Component{

  state = { 
    visible: false,
    users:[],
    roles:[]
  }

  // 展示用户操作框
  showModal = (item) => {
    if (this.isUpdate) {
      console.log(item)
/*       this.refs.Form.setFieldsValue({
        username:item.username,
        phone:item.phone,
        email:item.email,
        role_id: item.role_id
      }) */
    }
    this.setState({
      visible: true,
    })
  }

  // 创建用户/修改用户
  handleOk = () => {
    this.refs.Form.validateFields().then(
      async (values) => {
        let result
        if (this.isUpdate) {
          values._id = this._id
          result = await reqUpdateUser(values)
        } else{
          result = await reqCreateUser(values)
        }
        console.log(result)
        const {status, msg} = result
        if (status === 0) {
          message.success(this.isUpdate ? '修改用户信息成功' : '创建用户成功')
          this.getUserList()
          this.setState({
             visible: false
          })
          this.refs.Form.resetFields()
        } else {
          message.warning(msg)
        }
      },
      error => {}
    )
  }

  // 取消用户操作框
  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.refs.Form.resetFields()
  }


  // 删除用户
  deleteUser = (user) =>{
    confirm({
      title: `确定删除用户 ${user.username} 吗?`,
      icon: <ExclamationCircleOutlined />,
      content: '删除用户将无法登录使用相应权限',
      okText:'确认',
      cancelText:'取消',
      onOk: async () => {
        let result = await reqDeleteUser(user.key)
        const {status, msg} = result
        if (status === 0){
          message.success(`删除用户${user.username}成功`)
          this.getUserList()
        } else{
          message.warning(msg)
        }
      }
    })
  }
  
  // 初始化/更新用户列表
  getUserList = async () => {
    let result = await reqUserList()
    const {status, data, msg} = result
    if (status === 0) {
      this.setState({
        users:data.users.reverse(),
        roles:data.roles
      })
    } else {
      message.warning(msg)
    }
  } 
  componentDidMount() {
    this.getUserList()
  }

  render() {
    const {roles, users} = this.state
    const dataSource = users.map((item)=>{
      return {
        key: item._id,
        username: item.username,
        email: item.email,
        phone: item.phone,
        create_time: dayjs(item.create_time).format('YYYY年 MM月-DD日 HH:mm'),
        role_id: item.role_id
      }
    })
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        width: '13%',
        align: 'center',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        width: '18%',
        align: 'center',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        align: 'center',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        width: '20%',
        align: 'center',
        key: 'create_time',
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        width: '17%',
        align: 'center',
        key: 'role_id',
        render: (role_id) => {
          let roleItem = roles.find((item)=> item._id === role_id)
          return roleItem.name
        }
      },
      {
        title: '操作',
        width: '15%',
        align: 'center',
        key: 'todo',
        render: (item)=>{
          return (
            <div>
              <Button type="link"
                onClick={
                  ()=>{
                    this.isUpdate = true
                    this._id = item.key
                    this.showModal(item)
                  }
                }
              >修改</Button>
              <Button type="link"
                onClick={
                  ()=>{
                    this.deleteUser(item)
                  }
                }
              >删除</Button>
            </div>
          )
        }
      }
    ]    
    return(
    <div>
       <Card title={
        <Button type="primary"
          onClick={()=>{
            this.isUpdate = false
            this.showModal()
          }}
        >
          创建用户
        </Button>
      }>
        <Table 
          dataSource={dataSource} 
          columns={columns}
          bordered
        />
      </Card>
      <Modal
        title= {this.isUpdate ? "修改用户" : "添加用户"}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form
          labelCol={{ span:4 }}
          wrapperCol={{span: 12}}
          ref="Form"
        >
          <Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '必须输入用户名!' }]} 
          >
            <Input placeholder="请输入用户名"/>
          </Item>
          {
            this.isUpdate ? null : (
              <Item
              label="密码"
              name="password"
              rules={[{ required: true, message: '必须输入密码!' }]}
              // style={{display: this.isUpdate ? 'none' : ''}}
            >
              <Input placeholder="请输入密码" type="password"/>
            </Item>
            )
          }
          <Item
            label="手机号"
            name="phone"
            rules={[{ required: true, message: '必须输入手机!' }]} 
          >
            <Input placeholder="请输入手机号"/>
          </Item>
          <Item
            label="邮箱"
            name="email" 
          >
            <Input placeholder="请输入邮箱"/>
          </Item>
          <Item
            label="角色"
            name="role_id"
            rules={[{ required: true, message: '必须指定角色!' }]} 
          >
            <Select>
              {
                roles.map((item)=>{
                  return <Option value={item._id} key={item._id}>{item.name}</Option>
                })
              }
            </Select>
          </Item>
        </Form>
      </Modal>
    </div>
    )
  }
}