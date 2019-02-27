
import React from 'react'

import E from 'wangeditor'

import { Menu, Icon, Button, Input, Checkbox, Row, Col, message, Table } from 'antd';
import cookie from 'react-cookies';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import '../static/my/css/news.css';
import '../static/my/css/classfication.css';
import {PersonCompetitionUrl} from '../../config/router.js';
import {DetailCompetitionUrl} from '../../config/router.js';
import {SelectClass} from '../../config/router.js';
require('../../static/css/style.css');
require('../../static/css/bootstrap.min.css');
require('../../static/my/css/login.css');


class PersonCompetition extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      nowPage: 1,
      totalPage: 1,
      pageSize: 10,
      personAll: '',
      competitionTitle: '',
    }
    this.tmp = this.tmp.bind(this);
    this.columns = [ {
      title: '参加人',
      dataIndex: 'realname',
      key: 'realname',
    }, {
      title: '学号',
      dataIndex: 'studentId',
      key: 'studentId',
    },
       {
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        
      }
    ];
  }
  tmp = (key) => {
    console.log("------"+key);

  }
   componentWillMount() {
    this.getClass();
    this.getInfo();
  }
  getClass() {
    fetch(PersonCompetitionUrl, {
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'competitionId='+this.props.match.params.id+'&pageNum='+this.state.nowPage+'&pageSize='+this.state.pageSize
    }).then( res=> res.json()).then(
      data => {
        if (data.code==0) {
            this.setState({nowPage: data.resultBean.currentPage});
         
          this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
          this.setState({personAll: data.resultBean.items});
        } else {
          this.setState({nowPage: 1});
          this.setState({totalPage: 1});
          this.setState({personAll: ''});
          message.error(data.msg);
        }
      }
    )
  }
  getInfo(){
    fetch(DetailCompetitionUrl, {
      method: 'POST',
      headers: {
        'Authorization': cookie.load('token'),
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: 'competitionId='+this.props.match.params.id
    }).then( res=> res.json()).then(
      data => {
        if (data.code==0) {
            this.setState({competitionTitle: data.resultBean.competitionTitle});
        } else {
            this.setState({competitionTitle: ''});
          message.error(data.msg);
        }
      }
    )
  }

  render() {
    return(
    <div style={{ flex: 1, padding: "10px",backgroundColor:"#ffffff", width:1000, margin:'0 auto', marginTop:50 }}>
      <h3>{this.state.competitionTitle}</h3>
      <Table columns={this.columns} dataSource={this.state.personAll} pagination={false} bordered />
      
    </div>
    
    );
  }
}

export default PersonCompetition;