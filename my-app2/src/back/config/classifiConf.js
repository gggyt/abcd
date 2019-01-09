import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';

export const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: '创建时间',
  dataIndex: 'time',
  key: 'time',
},  {
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">修改</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
    </span>
  ),
}];
export const data = [{
  key: '1',
  name: 'John Brown',
  time: 32,
}, {
  key: '2',
  name: 'Jim Green',
  time: 42,
}, {
  key: '3',
  name: 'Joe Black',
  time: 32,
},{
  key: '1',
  name: 'John Brown',
  time: 32,
}, {
  key: '2',
  name: 'Jim Green',
  time: 42,
}, {
  key: '3',
  name: 'Joe Black',
  time: 32,
}];