import React from 'react';

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert ,Popconfirm } from 'antd';
import cookie from 'react-cookies';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/classfication.css';
import {SelectAnnounce} from '../config/router.js';
import {DeleteAnnounce} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2'
import Announcement from './announcement';

var emitter = new EventEmitter2()

class ShowTable extends React.Component{
  constructor(props) {
    super(props);
    this.state={xx:0};
    this.tmp = this.tmp.bind(this);
    this.columns = [{
      title: '公告名',
      dataIndex: 'announceTitle',
      key: 'announceTitle',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '作者',
      dataIndex: 'announceCreateUser',
      key: 'announceCreateUser',
    }, {
      title: '创建时间',
      dataIndex: 'announceCreateTime',
      key: 'announceCreateTime',
    },  {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.announceId)}>
          <a  href="javascript:;">删除</a>
        </Popconfirm>
        <Divider type="vertical" />
        <a onClick={this.tmp}>修改</a>
        </div>
       ),
    }];
  }
  tmp() {
    this.setState({xx: 1});
  }
  handleDelete = (key) => {
      fetch(DeleteAnnounce,{   //Fetch方法
            method: 'POST',
            headers: {
              'Authorization': cookie.load('token'),
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
           body: 'announceId='+key

        }).then(res => res.json()).then(
            data => {
                if(data.code==0) {
                  emitter.emit('changeFirstText', 'Second');
                }
                else {
            window.alert(data.code.msg);
                }
            }
        )
  }

  render() {
    let re;
    if (this.state.xx) {
      re = <Announcement />
    } 
    else {
      re = <Table columns={this.columns} dataSource={this.props.classAll} pagination={false} />
    }
    return(
    <div>
      {re}
      
      </div>
    
    );
  }
}

class AllAnnounce extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      nowPage: 1,
      totalPage: 2,
      pageSize: 10,
      announceAll: '',
      announceTitle: '',
    }
    this.announceTitleChange = this.announceTitleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    emitter.on('changeFirstText', this.changeText.bind(this))
  }

  changeText( msg ){
    this.getClass();
  }
  componentWillMount() {
    this.getClass();
  }
  getClass() {
    fetch(SelectAnnounce, {
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'announceTitle='+this.state.announceTitle+'&pageNum='+this.state.nowPage
    }).then( res=> res.json()).then(
      data => {
        if (data.code==0) {
          this.setState({nowPage: data.resultBean.currentPage});
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
          this.setState({announceAll: data.resultBean.items});
        } else {
          this.setState({nowPage: 1});
          this.setState({totalPage: 1});
          this.setState({announceAll: ''});
        }
      }
    )
  }
  announceTitleChange(e) {
    this.setState({announceTitle: e.target.value});
  }
  pageChange = (page) => {
    console.log(page);
    this.setState({ nowPage: page }, () => this.getClass());
    
  }
  buttonClick() {
    this.getClass();
  }
  render() {
    return(
      <div style={{ flex: 1, padding: "10px" }}>
        <div className="title">
          <h3>公告</h3>
        </div>
        <div className="searchF">
         <div className="example-input">
          <Input size="small" onChange={this.announceTitleChange} placeholder="目录名" style={{height:30 , width:150}}/>
          &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={this.buttonClick}/>
          </div>
        </div>
        <div className="search"> 
         <ShowTable classAll={this.state.announceAll}/>
        </div>
        <div className="searchPage">
        <Pagination size="small" simple onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
      </div>
      </div>
    );
  }
}
class ShowAnnounce extends React.Component{

  render() {
    return(
      <AllAnnounce />
    );
  }
}
export default ShowAnnounce;