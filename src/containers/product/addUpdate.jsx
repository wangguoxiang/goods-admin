import React, {Component} from 'react'
import { Card, Button, Form, Input, Select, message } from 'antd'
import {ArrowLeftOutlined} 
  from '@ant-design/icons'

import Pictureswall from './picturesWall'
import Richtext from './richText'
import {reqCategoryList, reqAddProduct} from '../../api' 

const {Item} = Form
const { Option } = Select

class AddUpdate extends Component{

  state = {
    categoryList:[]
  }

  onFinish = async (values) => {
    values.imgs = this.refs.Pictureswall.getImgsName()
    values.detail = this.refs.Richtext.getRichText()
    let result = await reqAddProduct(values)
    const {status, msg} = result
    if (status === 0) {
      message.success('添加商品成功！')
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

  componentDidMount () {
    this.getCategoryList()
  }

  render() {
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
            </Button>添加商品
          </div>}
        >
         <Form
          labelCol={{ span:2 }}
          wrapperCol={{span: 8}}
          onFinish={this.onFinish}
         >
          <Item
            label="商品名称"
            name="name"
            rules={[{ required: true, message: '必须输入商品名称!' }]}
          >
            <Input placeholder="商品名称"/>
          </Item>

          <Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: '必须输入商品描述!' }]}
          >
            <Input placeholder="商品描述" />
          </Item>
          <Item
            label="商品价格"
            name="price"
            rules={[{ required: true, message: '必须输入价格!' }]}
          >
            <Input placeholder=" 商品价格" prefix='￥' addonAfter='元'/>
          </Item>
          <Item
            label="商品分类"
            name="categoryId"
            rules={[{ required: true, message: '必须输入商品分类!' }]}
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