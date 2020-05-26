import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Table,Button,Card, Modal,Input,Form, message} from 'antd'
import {
  PlusCircleOutlined
} from '@ant-design/icons'

import {reqAddCategory, reqUpdateCategoty} from '../../api'
import {saveCategoryActionAsync} from '../../redux/actions/saveCategoryAction.js'

const {Item} = Form 

@connect(
  state => ({category: state.category}),
  {saveCategoryActionAsync}
)
class Category extends Component{
  state = { 
    visible: false
   }

  showModal = () => {
    this.setState({
      visible: true
    })
  }
  // 确认添加分类信息
  handleOk = () => {
    this.refs.categoryForm.validateFields().then(
      async (value) => {
        let {category} = value
        let result
        if (this.isAdd) {
          result = await reqAddCategory(category)
        } else {
          result = await reqUpdateCategoty(this.categotyId, category)
        }
        if (result.status === 0 ){
          this.getCategoryList()
          message.success('操作分类成功',1)
          this.setState({
            visible: false
          })
          this.refs.categoryForm.resetFields()
        } else {
          message.warning(result.msg,1)
        }
      }
    ).catch(
      err => {}
    )
    
  }

  // 取消添加分类
  handleCancel = e => {
    this.setState({
      visible: false
    })
    this.refs.categoryForm.resetFields()
  }

  // 获取分类列表
  getCategoryList = () => {
   this.props.saveCategoryActionAsync()
  }  


  // 处理修改分类
  handleChange = (item) => {
    this.isAdd = false          
    this.showModal()
    this.categotyId = item.key
  }

  componentDidMount() {
    this.getCategoryList()
  }
  render() {
    const dataSource = this.props.category.map(item => {
      return {
        key: item._id,
        name: item.name
      }
    })
    
    const columns = [
      {
        title: '商品分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
       // dataIndex: 'name',
        key: 'todo',
        align: 'center',
        width: '30%',
        render:(item)=>{
          return <Button type="link" onClick={()=>this.handleChange(item)}>修改分类</Button>
        } 
      }
    ]
    return(
      <div>
        <Card 
          extra={
          <Button type="primary" icon={<PlusCircleOutlined />} 
          onClick={
            ()=>{
              this.isAdd = true
              this.showModal()
          }}>
              添加分类
            </Button>}>              
          <Table 
          dataSource={dataSource} 
          columns={columns} 
          bordered
          pagination={{pageSize:5}}
          />
        </Card>
        <Modal
          title= {this.isAdd ? "添加分类" : "修改分类"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
          <Form 
           ref="categoryForm"
          >
            <Item name="category"
            rules={[
              { required: true, message: '请输入分类名称' }
            ]}
            initialValue= {this.value}
            >
              <Input placeholder="请输入分类名称" />
            </Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default Category