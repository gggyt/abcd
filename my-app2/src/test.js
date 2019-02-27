import React from 'react';
import { Menu, Button, Input, Checkbox, Row, Col, Pagination, Table, Divider, Tag,Alert ,Popconfirm } from 'antd';
import { Upload, Icon, message, Select,Modal  } from 'antd';
import Cropper from './back/react-cropper';
import {UploadImg1} from './config/router.js';      
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './back/static/my/css/home.css';
import routes from './back/config/backHomeConf';
import Back from './static/images/blog-1.jpg';
import AvatarEditor from 'react-avatar-editor';
import Slider from 'react-avatar-editor'

class Test extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          footer={null}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{width: 800}}
          width={700}  
        >
          <img alt="example" style={{ width: '100%' }} src="http://localhost:9999/image/tmp.jpg" />
        </Modal>
      </div>
    );
  }
}

export default Test;