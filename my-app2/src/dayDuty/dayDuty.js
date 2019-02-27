import React from 'react';
import { Card , Radio } from 'antd';
import { Tabs, Button, Row, Col } from 'antd';
import { Upload, Icon, Modal, Input, Pagination, Dropdown, Menu, message, Table } from 'antd';
import cookie from 'react-cookies';
import {SelectDayDuty} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2';

const columns = [{
  title: '名称',
  dataIndex: 'dayName',
}, {
  title: '更新时间',
  dataIndex: 'createDate',
}, {
  title: '清洁人',
  dataIndex: 'dutyUserNames',
}];
class Show extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
          <Table
          columns={columns}
          dataSource={this.props.dayDutyAll}
          bordered
        />
    );
  }
}
class DayDuty extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      dayDutyAll:[]
    };
  }
  componentWillMount(){
    this.getDayDutyData();
  }
  getDayDutyData(){
    fetch(SelectDayDuty,{
        method: 'POST',
        headers: {
          'Authorization': cookie.load('token'),
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
      }).then(res => res.json()).then(
        data=>{
          if (data.code==0) {
            //alert(data.msg);
             this.setState({dayDutyAll: data.resultBean});
          } 
          else {
            message.error(data.msg);
          }
        }
      )
  }
  render() {
    return(
      <div className="bodyMain">
        <div  style={{width:1000, margin: '0 auto', padding: 10, backgroundColor:'#ffffff', marginTop:50}}>
          <Show
          dayDutyAll={this.state.dayDutyAll}
          />
        </div>
      </div>
    );
  }
}

export default DayDuty;