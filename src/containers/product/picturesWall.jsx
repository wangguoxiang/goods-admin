import React, {Component} from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons'

import {reqRemovedPicture} from '../../api'

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  }

  // 获取图片数组
  getImgsName = () => {
    let arr = []
    this.state.fileList.forEach(
      (item)=>{
        arr.push(item.name)
      }
    )
    return arr
  }


  // 展示图片
  setImgsName = (imgs) => {
    let arr = imgs.map((item,index)=>{
      return {
        uid: -index,
        name: item,
        status:'done',
        url:`/upload/${item}`
      }
    })
    this.setState({fileList:arr})
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file,fileList }) => {
    if (file.status === 'done'){
     fileList[ fileList.length-1].name = file.response.data.name
    }
    if (file.status === 'removed'){
      let result = await reqRemovedPicture(file.name)
      const {status, msg} = result
      if (status === 0) {
        message.success('删除图片成功！')
      } else {
        message.warning(msg)
      }
    }
    this.setState({ fileList })
  }

  render () {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    return(
      <div className="clearfix">
        <Upload
          action="http://localhost:3000/manage/img/upload"
          method="POST"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}