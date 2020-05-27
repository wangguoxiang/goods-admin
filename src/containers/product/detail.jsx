import React, {Component} from 'react'
import { Card, Button, List, message} from 'antd'
import {ArrowLeftOutlined} 
  from '@ant-design/icons'

import './detail.less'

import {reqCategoty, reqProductDetail} from '../../api'

const {Item} = List

export default class Detail extends Component{

  state = {
    product:
      {
        imgs:[]
      },
    category:''
  }

  getProduct = async (ProductId) => {
    let result = await reqProductDetail(ProductId)
    const {status, msg} = result
    if (status === 0) {
      this.setState({product:result.data})
      this.getCategory(result.data.categoryId)
    } else{
      message.warning(msg)
    }
  }

  getCategory = async (categoryId) => {
    let result = await reqCategoty(categoryId)
    const {status,data,msg} = result
    if (status === 0) {
     this.setState({category:data.name})
    } else {
      message.warning(msg)
    }
  }

  componentDidMount () {
   const ProductId =  this.props.match.params.id
    this.getProduct(ProductId)
  }
  render() {
    const {name, desc, detail, price} = this.state.product
    const data = [
      {
        title:'商品名称',
        content: name,
      },
      {
        title: '商品描述',
        content: desc
      },
      {
        title: '商品价格',
        content: price
      },
      {
        title: '所属分类',
        content: this.state.category
      },
      {
        title: '商品图片',
        content: this.state.product.imgs.map((item,index)=>{
          return <img style={
            {
              width: '150px',
              height: '150px'
            }
          } src={`/upload/${item}`} alt='img' key={index}/>
        })
      },
      {
        title: '商品详情',
        content: <span dangerouslySetInnerHTML={{__html: detail}}></span>
      }
    ]
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
          </Button>商品详情
        </div>}
      >
        <List
          dataSource={data}
          renderItem={item => (
            <Item className="Item">
              <span className="Item-left">{item.title}:</span>
                {item.content}
            </Item>
          )}
        />
      </Card>
    )
  }
}