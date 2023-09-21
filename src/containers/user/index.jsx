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
    roles:[],
  }

 

  // 展示用户操作框
  showModal = (item) => {
    if (this.isUpdate) {
      console.log(item)
        this.refs.Form.setFieldsValue({
        username:item.username,
        phone:item.phone,
        email:item.email,
        role_id: item.role_id
      }) 
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
    const sex = [
      {vlaue: 0, key:'男', name: '男'},
      {value: 1, key:'女', name: '女'},
    ]

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
        width: '8%',
        align: 'center',
        key: 'username',
      },
      {
        title: '姓名',
        dataIndex: 'name',
        width: '8%',
        align: 'center',
        key: 'name',
      },
      {
        title: '电话',
        dataIndex: 'mobile',
        width: '10%',
        align: 'center',
        key: 'mobile',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        width: '5%',
        align: 'center',
        key: 'sex',
      },
      {
        title: '年齡',
        dataIndex: 'age',
        width: '5%',
        align: 'center',
        key: 'age',
      },
      {
        title: '职称',
        dataIndex: 'job',
        width: '5%',
        align: 'center',
        key: 'job',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        width: '5%',
        align: 'center',
        key: 'avatar',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        width: '15%',
        align: 'center',
        key: 'create_time',
      },
      {
        title: '最后登录时间',
        dataIndex: 'end_time',
        width: '15%',
        align: 'center',
        key: 'end_time',
      },
      {
        title: '操作',
        width: '10%',
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
            name="mobile"
            rules={[{ required: true, message: '必须输入手机!' }]} 
          >
            <Input placeholder="请输入手机号"/>
          </Item>
          <Item
            label="姓名"
            name="name" 
          >
            <Input placeholder="请输入用户真实姓名"/>
          </Item>
          <Item
            label="性别"
            name="sex"
            rules={[{ required: false, message: '选择性别' }]} 
          >
            <Select>
              {
                sex.map((item)=>{
                  return <Option value={item.value} key={item.key}>{item.name}</Option>
                })
              }
            </Select>
          </Item>
          <Item
            label="年龄"
            name="age"
            rules={[{ required: false, message: '请输入用户实际年龄' }]} 
          >
             <Input placeholder="请输入用户实际年龄"/>
          </Item>
          <Item
            label="教师职称"
            name="job"
            rules={[{ required: false, message: '请输入用户职称' }]} 
           >
             <Input placeholder="请输入用户职称"/>
          </Item>
        </Form>
      </Modal>
    </div>
    )
  }
}