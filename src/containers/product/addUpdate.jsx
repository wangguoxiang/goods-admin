import React, {Component} from 'react'
import { Card, Button, Form, Input, Select, message } from 'antd'
import {ArrowLeftOutlined} 
  from '@ant-design/icons'

import Pictureswall from './picturesWall'
import Richtext from './richText'
import {reqCategoryList, reqAddProduct, reqProductDetail, reqProductUpdateDetail} from '../../api' 

const {Item} = Form
const { Option } = Select

class AddUpdate extends Component{

  state = {
    categoryList:[],
    product:{
    },
    isUpdate: false
  }

  // 添加/修改商品
  onFinish = async (values) => {
    let result
    const {id} = this.props.match.params
    values.imgs = this.refs.Pictureswall.getImgsName()
    values.detail = this.refs.Richtext.getRichText()
    if (id) {
      values._id = id
      result = await reqProductUpdateDetail(values)
    } else {
      result = await reqAddProduct(values)
    }
    const {status, msg} = result
    if (status === 0) {
      message.success(id ? '修改商品成功！' : '添加商品成功！')
      this.props.history.replace('/admin/prod_about/product')
    } else {
      message.warning(msg)
    }
  }

  //获取分类列表
  getCategoryList = async () =>{
    let result = await reqCategoryList()
    const {status, data} = result
    if (status === 0) {
      this.setState({categoryList: data})
    } else {
      message.warning('获取分类列表失败')
    }
  }

  // 获取商品详情
  getProduct = async (id) =>{
    let result = await reqProductDetail(id)
    const {status, data, msg} = result
    if (status === 0) {
      this.setState({product:data})
      const {name, desc, price, categoryId, detail, imgs} = this.state.product
      this.refs.Pictureswall.setImgsName(imgs)
      this.refs.Richtext.setRichText(detail)
      this.refs.Form.setFieldsValue({
        name,desc,price,categoryId
      })
    } else{
      message.warning(msg)
    }
  }

  componentDidMount () {
    const {id} = this.props.match.params
    if (id) this.getProduct(id)
    this.getCategoryList()
  }

  render() {
    const {id} = this.props.match.params
    const {name, desc, price, categoryId} = this.state.product
    return(
        <Card 
          title={
          <div>
            <Button 
              type="link"
              onClick={()=>{
                this.props.history.goBack()
              }}
            ><ArrowLeftOutlined style={{fontSize:15}}
            />
            </Button>{id ? '修改商品' : '添加商品'}
          </div>}
        >
         <Form
          labelCol={{ span:2 }}
          wrapperCol={{span: 8}}
          onFinish={this.onFinish}
          ref="Form"
         >
          <Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '必须输入商品名称!' }]}
            initialValue={name || ''}
          >
            <Input placeholder="商品名称" />
          </Item>

          <Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: '必须输入商品描述!' }]}
            initialValue={desc || ''}
          >
            <Input placeholder="商品描述" />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: '必须输入价格!' }]}
            initialValue={price || ''}
          >
            <Input placeholder=" 商品价格" prefix='￥' addonAfter='元'/>
          </Item>
          <Item
            label="商品分类"
            name="categoryId"
            rules={[{ required: true, message: '必须输入商品分类!' }]}
            initialValue={categoryId || ''}
          >
            <Select placeholder='请选择分类'>
              {this.state.categoryList.map((item,index)=>{
                return (
                  <Option value={item._id} key={index}>{item.name}</Option>
                )
              })}
            </Select>  
          </Item>
          <Item
            label="商品图片"
            //name="productImg"
          >
            <Pictureswall ref="Pictureswall"/>
          </Item>
          <Item
            label="商品详情"
            //name="productDetail"
            wrapperCol={{span: 20}}
          >
            <Richtext  ref="Richtext"/>
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Item>
         </Form>
        </Card>
    )
  }
}

export default AddUpdate