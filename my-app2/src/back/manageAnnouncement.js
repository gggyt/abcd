import React from 'react';

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert ,Popconfirm } from 'antd';
import cookie from 'react-cookies';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/classfication.css';
import {SelectAnnounce} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2'

var emitter = new EventEmitter2()

class ShowTable extends React.Component{
  constructor(props) {
    super(props);
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
        <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.classId)}>
          <a href="javascript:;">Delete</a>
        </Popconfirm>
              
       ),
    }];
  }
  handleDelete = (key) => {
      fetch('xx',{   //Fetch方法
            method: 'POST',
            headers: {
              'Authorization': cookie.load('token'),
              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
           body: 'classId='+key

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
    return(
      <Table columns={this.columns} dataSource={this.props.classAll} pagination={false} />
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
      body: 'className='+this.state.className+'&pageNum='+this.state.nowPage
    }).then( res=> res.json()).then(
      data => {
        //console.log('token'+cookie.load('token'));
       // window.alert(data);
       // window.alert(data.code);

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
  render() {
    return(
      <div>
        <div className="title">
          <h3>公告</h3>
        </div>
        <div className="search">
            <div className="example-input">
          <Input size="small" onChange={this.announceTitleChange} placeholder="目录名" style={{height:30 , width:150}}/>
          &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={this.buttonClick}/>
          </div>
        </div>
        <div>
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