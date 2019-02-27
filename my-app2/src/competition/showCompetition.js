import React from 'react';

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert ,Popconfirm, message } from 'antd';
import cookie from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import '../back/static/my/css/classfication.css';
import {SelectCompetitionUrl} from '../config/router.js';
require('../static/my/css/invitation.css');

const id = -1;

class TagTitle extends React.Component{
  render(){
    let re;
    if(this.props.isDone==0) {
      re = <Tag color="#f50">已结束</Tag>
    } else {
      re = <Tag color="#108ee9">正在报名</Tag>
    }
    return(
      <a>
      {re}
      </a>
    )
  }
    
}
class ShowTable extends React.Component{
  constructor(props) {
    super(props);
    this.tmp = this.tmp.bind(this);
    this.columns = [{
      title: '校赛名',
      dataIndex: 'competitionTitle',
      key: 'competitionTitle',
      render: (text, record) => (
        <span>
            <Link to={'/competitionDetail/'+record.competitionId}>{record.competitionTitle}</Link>
       </span>
      ),
    }, {
      title: '创建人',
      dataIndex: 'createUser',
      key: 'createUser',
    }, {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
      render: (text, record) => (
        <span>
            {record.createDate}
       </span>
      )},
       {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <span>
              <TagTitle isDone={record.isDone}/>
         </span>
        ),
      }
    ];
  }
  tmp = (key) => {
    console.log("------"+key);

  }
  

  render() {
    return(
    <div>
      <Table columns={this.columns} dataSource={this.props.competitionAll} pagination={false} bordered />
      
    </div>
    
    );
  }
}

class AllCompetition extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      competitionAll: '',
      competitionTitle: '',
    }
    this.competitionTitleChange = this.competitionTitleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
  }

  changeText( msg ){
    this.getClass();
  }
  componentWillMount() {
    this.getClass();
  }
  getClass() {
    //alert(this.state.competitionTitle);
    fetch(SelectCompetitionUrl, {
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'competitionTitle='+this.state.competitionTitle+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
    }).then( res=> res.json()).then(
      data => {
        if (data.code==0) {
          if(data.resultBean.currentPage>0) {
            this.setState({nowPage: data.resultBean.currentPage});
          }else {
            this.setState({nowPage: 1});
          }
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
          this.setState({competitionAll: data.resultBean.items});
        } else {
          this.setState({nowPage: 1});
          this.setState({totalPage: 1});
          this.setState({competitionAll: ''});
          message.error(data.msg);
        }
      }
    )
  }
  competitionTitleChange(e) {
    this.setState({competitionTitle: e.target.value}, ()=>this.getClass());
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
      <div style={{width:1000, margin: '0 auto', padding: 10}} >
      <div className="backCD">
        <div className="searchF">
         <div className="example-input">
          <Input size="small" onChange={this.competitionTitleChange} placeholder="校赛名" style={{height:30 , width:150}}/>
          &nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" onClick={this.buttonClick}/>
          </div>
        </div>
        <div className="search"> 
         <ShowTable competitionAll={this.state.competitionAll}/>
        </div>
        <div className="searchPage">
        <Pagination size="small" simple onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize}
        pageSize={this.state.pageSize} defaultCurrent={this.state.nowPage} showQuickJumper />
      </div>
      </div>
      </div>
    );
  }
}
class ShowCompetition extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      show: 1,
      id: 1,
    }
  }
  changeShow(cid) {
    if (this.state.show==1) {
      this.setState({show:0});
    } else {
      this.setState({show:1});
    }
    this.setState({id: cid})
  }
  render() {
    return(

      <div className="bodyMain">
        <div>
        <AllCompetition />
        </div>
      </div>
    );
  }
}
export default ShowCompetition;