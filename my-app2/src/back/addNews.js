import React from 'react'

import E from 'wangeditor'

import { Menu, Icon, Button, Input, Checkbox, Row, Col } from 'antd';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/news.css';
require('../static/css/style.css');
require('../static/css/bootstrap.min.css');
require('../static/my/css/login.css');

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

class AddNewss extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
      }
  }
  render() {
    return (
      <div>
      <div className="col-md-9">
        <div className="title">
          <h2>撰写新闻</h2>
        </div>
        <div className="inputTitle">
          <Input size="small" placeholder="input with clear icon" allowClear/>
        </div>
        <br/>
        <div className="inputTitle">
        <div ref="editorElem" className="text">
        </div>  
        </div>

      </div>

      <div className="col-md-3">
      <br/><br/>
        <div className="push">
          <h3>发布</h3>
          <hr/>
          <Button size="small">保存为草稿</Button>
          <br/><br/>
          <Button type="primary" onClick={this.clickHandle.bind(this)}>发布</Button>
        </div>
        <div className="inputCatalog">
           <h3>分类</h3>
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
            <Row>
              <Col span={24}><Checkbox value="A">AAAAAAAAAAA</Checkbox></Col>
              <Col span={24}><Checkbox value="B">B</Checkbox></Col>
              <Col span={24}><Checkbox value="C">C</Checkbox></Col>
              <Col span={24}><Checkbox value="D">D</Checkbox></Col>
              <Col span={24}><Checkbox value="B">B</Checkbox></Col>
              <Col span={24}><Checkbox value="C">C</Checkbox></Col>
              <Col span={24}><Checkbox value="D">D</Checkbox></Col>
              <Col span={24}><Checkbox value="B">B</Checkbox></Col>
              <Col span={24}><Checkbox value="C">C</Checkbox></Col>
              <Col span={24}><Checkbox value="D">D</Checkbox></Col>
            </Row>
          </Checkbox.Group>
        </div>
      </div>

      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
	 editor.customConfig.uploadImgShowBase64 = true   // 使用 base64 保存图片
	 editor.customConfig.uploadFileName = 'myFileName';
	editor.customConfig.uploadImgServer = 'http://localhost:9999/uploadImg';
	editor.customConfig.uploadImgHooks = { 
		customInsert: function (insertImg, result, editor) { 
		var url =result.data; insertImg(url); 
		} 
	};

    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.create()
  }
  clickHandle() {
      alert(this.state.editorContent)
  }
}

export default AddNewss;