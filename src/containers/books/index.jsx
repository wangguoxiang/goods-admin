import React, {Component} from 'react'
import {Card, Table ,Button, Select, Input, message} from 'antd'
import {
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons'

import {reqBook, reqBookList, reqBookUpdate} from '../../api'

export default class Books extends Component {

    state = {
        loading:true,
        bookList:[],
        searchType:'bookName',
        total:'',
        searchName:''
      }

    // 初始化商品列表或者搜索商品
  getBookList = async (currentPage)=> {
    let result
    const {searchType,searchName} = this.state
    if (this.isSearch) {
      result = await reqBook({pageNum:currentPage,pageSize:4,searchName,searchType})
    }else {
      result = await reqBookList(currentPage,4)
    }
    const {status, data} = result
    if (status === 0) {
      this.setState({
        bookList:data.list,
        total:data.total,
        loading:false
      })
    } else {
      message.error('获教材库存列表失败')
      this.setState({loading:false})
    }
  }

   // 商品上架/下架
   BookUpdate = async (bookId, isSell) =>{
    if (isSell === 1) isSell = 2
    else isSell = 1
    let result = await reqBookUpdate(bookId, isSell)
    const {status,msg} = result
    if(status ===0 ){
      this.getBookList(this.pageNow)
      message.success(isSell === 1 ? '商品已上架' : '商品已下架',2)
    }
    else {
      message.warning(msg)
    }
  }
  

  componentDidMount () {
    this.getBookList(1)
    this.pageNow = 1
  }

  render() {
    const dataSource = this.state.bookList.map((item)=>{
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
        title: '教材编号',
        dataIndex: 'book_Id',
        key: 'book_Id',
        width: '5%'
      },
      {
        title: '教材名称',
        dataIndex: 'book_name',
        key: 'desbook_namec',
        width: '10%'
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
        title: '库存数量',
        key: 'count',
        align:'center',
        width: '5%',
        render: (value)=> {
          return value + '册'
        }
      },
      {
        title: '发放数量',
        key: 'out_count',
        align:'center',
        width: '5%',
        render: (value)=> {
          return value + '册'
        }
      },
      {
        title: '状态',
        key: 'status',
        align:'center',
        width: '5%',
        render: (value)=> {
          return (
          <div>
            <Button type={value.status===1 ? "danger" : "primary"}
              onClick={()=>{this.BookUpdate(value.key, value.isSell)}}
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
                this.props.history.push(`/admin/book/detail/${value.key}`)
              }
              }>详情
              </Button>
              <br/>
              <Button type="link" onClick={()=>{
                this.props.history.push(`/admin/book/addupdate/${value.key}`)
              }}         
              >修改
              </Button>
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
       defaultValue="查教材库存"
       style={{ width: 150 }}
       onChange= {(value)=>{this.setState({searchType:value})}}
      >
      <option value="bookName">按名称搜索</option>
      <option value="bookDesc">按描述搜索</option>
      </Select>
      <Input placeholder="请输入关键字" style={{ width:250 , margin: 10}}
        onChange={(event)=>{this.setState({searchName:event.target.value})}}
      />
      <Button type="primary"
        onClick={()=>{
          this.isSearch = true
          this.getBookList(1)
          }
        }
      ><SearchOutlined />
      搜索
      </Button>
    </div>
    }
    extra={<Button type="primary" icon={<PlusOutlined />} 
    onClick={()=>{
      this.props.history.push('/admin/book/addupdate')
    }}
    >添加教材</Button>}
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
          this.getBookList(value)
        }
      }
      }
    /> 
    </Card>
    )
  }
}