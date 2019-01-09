import React from 'react'

import E from 'wangeditor'

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination  } from 'antd';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/classfication.css';
require('../static/css/bootstrap.min.css');

const Search = Input.Search;
class AddClassify extends React.Component{
	render() {
		return(
			<div>
				<div className="title">
					<h3>分类目录</h3>
				</div>
				<div className="title">
					<h4>添加新分类目录</h4>
					<div className="example-input">
						<Input size="small" placeholder="目录名"  style={{height:30, width:200}}/>
					</div>
				</div>
				
			</div>
		);
	}
}
class HaveClassify extends React.Component{
	render() {
		return(
		<div className="search">
			<div className="search">
				<div className="example-input">
					<Input size="small" placeholder="目录名"  style={{height:30 , width:150}}/>
					<Button type="primary" shape="circle" icon="search" />
				</div>
			</div>
			<div className="search">
					<Pagination size="small" total={50} showSizeChanger showQuickJumper />
			</div>
		</div>
		);
	}
}
class AddNews extends React.Component {
 
  render() {
    return (
      <div>
		<div className="col-md-4">
			<AddClassify />
		</div>
		<div className="col-md-8">
			<HaveClassify />
		</div>
      </div>
    );
  }
  
}

export default AddNews;