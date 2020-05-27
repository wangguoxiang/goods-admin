import React, {Component} from 'react'
import {Card, Table ,Button, Select, Input, message} from 'antd'
import {
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'

import {reqProductList, reqProduct, reqProductUpdate} from '../../api'

const { Option } = Select


export default class Home extends Component{

  state = {
    loading:true,
    ProductList:[],
    searchType:'productName',
    total:'',
    searchName:''
  }

  // 初始化商品列表或者搜索商品
  getProductList = async (currentPage)=> {
    let result
    const {searchType,searchName} = this.state
    if (this.isSearch) {
      result = await reqProduct({pageNum:currentPage,pageSize:4,searchName,searchType})
    }else {
      result = await reqProductList(currentPage,4)
    }
    const {status, data} = result
    if (status === 0) {
      this.setState({
        ProductList:data.list,
        total:data.total,
        loading:false
      })
    } else {
      message.error('获商品列表失败')
      this.setState({loading:false})
    }
  }

  // 商品上架/下架
  ProductUpdate = async (productId, isSell) =>{
    if (isSell === 1) isSell = 2
    else isSell = 1
    let result = await reqProductUpdate(productId, isSell)
    const {status,msg} = result
    if(status ===0 ){
      this.getProductList(this.pageNow)
      message.success(isSell === 1 ? '商品已上架' : '商品已下架',2)
    }
    else {
      message.warning(msg)
    }
  }
  

  componentDidMount () {
    this.getProductList(1)
    this.pageNow = 1
  }

  render() {
    const dataSource = this.state.ProductList.map((item)=>{
      return {
        key: item._id,
        name:item.name,
        desc: item.desc,
        price:item.price,
        isSell: item.status // 1.上架 2.下架
      }
    })
    
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        width: '45%'
      },
      {
        title: '价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        align:'center',
        render: (value)=> {
          return '￥' + value
        }
      },
      {
        title: '状态',
        key: 'status',
        align:'center',
        width: '10%',
        render: (value)=> {
          return (
          <div>
            <Button type={value.isSell===1 ? "danger" : "primary"}
              onClick={()=>{this.ProductUpdate(value.key, value.isSell)}}
            >
              {value.isSell===1 ? '下架' : '上架'}
            </Button>
            <br/>
            <span>{value.isSell===1 ? '在售' : '已停售'}</span>
          </div>)
        }
      },
      {
        title: '操作',
        align:'center',
        key: 'todo',
        width: '10%',
        render:(value)=>{
          return(
            <div>
              <Button type="link" onClick={()=>{
                this.props.history.push(`/admin/prod_about/product/detail/${value.key}`)
              }
              }>详情
              </Button>
              <br/>
              <Button type="link">修改</Button>
            </div>
          )
        }
      }
    ]
    return(
    <Card 
    title= {
    <div>
      <Select
       defaultValue="productName"
       style={{ width: 150 }}
       onChange= {(value)=>{this.setState({searchType:value})}}
      >
      <Option value="productName">按名称搜索</Option>
      <Option value="productDesc">按描述搜索</Option>
      </Select>
      <Input placeholder="请输入关键字" style={{ width:250 , margin: 10}}
        onChange={(event)=>{this.setState({searchName:event.target.value})}}
      />
      <Button type="primary"
        onClick={()=>{
          this.isSearch = true
          this.getProductList(1)
          }
        }
      ><SearchOutlined />
      搜索
      </Button>
    </div>
    }
    extra={<Button type="primary" icon={<PlusOutlined />} 
    onClick={()=>{
      this.props.history.push('/admin/prod_about/product/addupdate')
    }}
    >添加商品</Button>}
    >
    <Table
     dataSource={dataSource}
     columns={columns} 
     bordered
     loading={this.state.loading}
     pagination={
       {pageSize:4,
        total:this.state.total,
        showQuickJumper:true,
        onChange:(value)=>{
          this.pageNow = value
          this.getProductList(value)
        }
      }
      }
    /> 
    </Card>
    )
  }
}