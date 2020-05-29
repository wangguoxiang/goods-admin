import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Card, Button, Table, Modal, message, Form, Input, Tree} from 'antd'
import dayjs from 'dayjs'

import menuList from '../../config/menuConfig'
import {reqRoleList, reqCreateRole,reqAuthRole} from '../../api'

const {Item} = Form
const {TreeNode} = Tree

@connect(
  state => ({username: state.userInfo.user.username}),
  {}
)
class Role extends Component{

  state= {
    roleList:[], //角色列表
    checkedKeys:[], //权限列表
    visible: false,
    AuthVisible:false
  }

  // 展示创建角色框
  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  // 展示授权框
  AuthShowModal = () => {
    this.setState({
      AuthVisible: true
    })
  }

  // 确认创建角色
  handleOk = () => {
    this.refs.Form.validateFields().then(
      async (value) => {
        const {roleName} = value
        let result = await reqCreateRole(roleName)
        const {status, msg} = result
        if (status === 0) {
          this.getRoleList()
          this.setState({visible: false})
          this.refs.Form.resetFields()
          message.success('创建角色成功！')
        } else message.warning(msg)
      },
      error => {}
    )  
  }

  // 确认授权
  AuthHandleOk = async () => {
    const auth_name = this.props.username
    const _id = this._id
    const menus = this.state.checkedKeys
    let result = await reqAuthRole ({auth_name,_id,menus})
    const {status, msg} = result
      if(status === 0) {
        message.success('设置角色权限成功')
        this.getRoleList()
        this.setState({AuthVisible: false})
      } else{
        message.warning(msg)
      }
  }


  // 取消创建角色
  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.refs.Form.resetFields()
  }

  // 取消授权框
  AuthHandleCancel = () =>{
    this.setState({AuthVisible: false})
  }

  // 获取角色列表
  getRoleList = async () => {
    let result = await reqRoleList()
    const {status, msg ,data} = result
    if (status ===0){
      this.setState({roleList:data.reverse()})
    } else{
      message.warning(msg)
    }
  }

  componentDidMount() {
    this.getRoleList()
  }

   onCheck = (checkedKeys) => {
    this.setState({checkedKeys})
  }

/*   getAuthList = (menuList) => {
    return menuList.map((item,index)=>{
    if (item.children instanceof Array) {
      this.getAuthList(item)
    }
    return {
      title: item.title,
      key: item.key
    }
  }) 
} */

  render() {
    let treeData = [{
      title: '平台权限',
      key: 'auth',
      children: menuList
    }]

    const dataSource = this.state.roleList.map((item)=>{
      return {
        key: item._id,
        name:item.name,
        create_time: dayjs(item.create_time).format('YYYY年 MM月-DD日 HH:mm'),
        auth_time:  item.auth_time,
        auth_name: item.auth_name,
        menus: item.menus
      }
     }
    )
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        align:'center'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        width: '25%',
        key: 'age',
        align:'center'
      },
      {
        title: '授权时间',
        // dataIndex: 'auth_time',
        width: '25%',
        key: 'address',
        align:'center',
        render: (item) => {
          return item.auth_time ?  dayjs(item.auth_time).format('YYYY年 MM月-DD日 HH:mm') : ''
        }
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'address',
        align:'center'
      },
      {
        title: '操作',
        key: 'address',
        align:'center',
        render: (value)=>{
          return(<Button type="link"
           onClick={
              () => {
              this._id = value.key
              this.setState({
                checkedKeys: value.menus
              })
              this.AuthShowModal()
            }
           }
          >设置权限</Button>)
        }
      },
    ]
    return(
      <div>
        <Card title={<Button type='primary' onClick={this.showModal}>创建角色</Button>}>
          <Table 
            dataSource={dataSource} 
            columns={columns}
            bordered
          />
        </Card>
        <Modal
          title="添加角色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form
            onFinish={this.onFinish}
            ref="Form"
          >
            <Item 
             label="角色名称"
             name="roleName"
             rules={[
              { required: true, message: '必须输入角色名称！' }
            ]}>
              <Input placeholder="请输入角色名称"/>
            </Item>
          </Form>
        </Modal>
        <Modal
          title="设置角色权限"
          visible={this.state.AuthVisible}
          onOk={this.AuthHandleOk}
          onCancel={this.AuthHandleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Tree
            checkable
            defaultExpandAll
            checkedKeys={this.state.checkedKeys}
            onCheck={this.onCheck}
            treeData={treeData}
          >
            <TreeNode title="平台权限" key="top"/>
          </Tree>
        </Modal>
      </div>
    )
  }
}
export default Role