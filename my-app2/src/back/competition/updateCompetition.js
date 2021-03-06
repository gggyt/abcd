
import React from 'react'

import E from 'wangeditor'

import { Menu, Icon, Button, Input, Checkbox, Row, Col, message } from 'antd';
import cookie from 'react-cookies';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import '../static/my/css/news.css';
import '../static/my/css/classfication.css';
import {AddCompetitionUrl} from '../../config/router.js';
import {UpdateCompetitionUrl} from '../../config/router.js';
import {DetailCompetitionUrl} from '../../config/router.js';
import {SelectClass} from '../../config/router.js';
require('../../static/css/style.css');
require('../../static/css/bootstrap.min.css');
require('../../static/my/css/login.css');



class UpdateCompetition extends React.Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        competitionId: -1,
        editorContent: '',
        title: '',
        editorContentText:'',
        editor:'',
      }
      this.titleChange = this.titleChange.bind(this);
      this.publish = this.publish.bind(this);
      this.updateCompetition = this.updateCompetition.bind(this);
  }
  componentWillMount(){
    this.getData();
  }
  getData() {
    console.log('token'+cookie.load('token'));
    fetch(DetailCompetitionUrl, {
      method: 'POST',
      headers: {
              'Authorization': cookie.load('token'),
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'competitionId='+this.props.match.params.id
    }).then( res => res.json()).then(
      data => {
        //console.log('token'+cookie.load('token'));
       // window.alert(data);
       // window.alert(data.code);
        if (data.code==0) {
          this.setState({title: data.resultBean.competitionTitle});
          this.setState({editorContent: this.state.editor.txt.html(data.resultBean.competitionBody)});
        } else {
          message.error(data.msg)
        }
      }
  
    )
  }
  titleChange(e) {
    console.log(e.target.value);
      this.setState({title: e.target.value});
      console.log(this.state.title);
  }
  publish() {
    
      this.updateCompetition()
  }
  
  updateCompetition() {
    if (this.state.title.length==0) {
      alert('新闻标题不为空');
      return;
    }
    if (this.state.editorContentText.length==0) {
      alert('新闻内容不为空');
      return;
    }
    fetch(UpdateCompetitionUrl,{   //Fetch方法
            method: 'POST',
            headers: {
              'Authorization': cookie.load('token'),
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
            body: 'competitionId='+this.props.match.params.id+'&competitionTitle='+this.state.title+'&competitionBody='+encodeURI(this.state.editorContent)

        }).then(res => res.json()).then(
            data => {
                if(data.code==0) {
                  message.success('修改成功');
                  this.setState({newsId: data.resultBean});
                   console.log(this.state.newsId);
                }
                else {
                  message.error(data.msg);
                }
            }
        )
  }
  render() {
    return (
      <div>
      <div className="col-md-9">
        <div className="title">
          <h2>添加校赛</h2>
        </div>
        <div className="inputTitle">
          <Input size="small" placeholder="校赛名称" value={this.state.title} style={{height:30}} onChange={this.titleChange}/>
        </div>
        <br/>
        <div className="inputTitle">
        <div ref="editorElem" className="toolbar">
        </div>  
        </div>

      </div>

      <div className="col-md-3">
      <br/><br/>
        <div className="push">
          <h3>发布</h3>
          <hr/>
          <Button type="primary" onClick={this.publish}>发布</Button>
        </div>
        
      </div>

      </div>
    );
  }
  componentDidMount() {
    const elem = this.refs.editorElem
    const editor = new E(elem)
    this.setState({editor:editor})
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
      this.setState({editorContentText: editor.txt.text()})
    }
    editor.create()
  }
}

export default UpdateCompetition;