import React from 'react';

import E from 'wangeditor';

import { Menu, Icon, Button, Input, Checkbox, Row, Col, Pagination,  Table, Divider, Tag,Alert  } from 'antd';
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './static/my/css/classfication.css';
import cookie from 'react-cookies';
import {columns} from './config/classifiConf';
import {data} from './config/classifiConf';
require('../static/css/bootstrap.min.css');





class ShowTable extends React.Component{
	render() {
		return(
			<Table columns={columns} dataSource={data} pagination={false} />
		);
	}
}

const Search = Input.Search;
class AddClassify extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			className: '',
			isError: false,
			reason: 'xx',
		}
		this.classNameChange = this.classNameChange.bind(this);
		this.addClass = this.addClass.bind(this);
	}
	classNameChange(e) {
		this.setState({className: e.target.value});
	}
	addClass(e) {
		console.log(this.state.className);
		if (this.state.className.length==0) {
			this.setState({reason: '目录名称不能为空'});
			this.setState({isError: true});
			return;
		}
		fetch(`http://localhost:9999/xxx/xxx`,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'username='+this.state.username+'&password='+this.state.password

        }).then(res => res.json()).then(
            data => {
				window.alert('code'+data.code);
                if(data.code==0) {
                	window.alert('添加成功');
					this.setState({isError: false});
                }
                else {
                	this.setState({isError: true});
                	this.setState({reason: data.msg});
                	return false;
                }
            }
        )
	}
	render() {
		let errorShow;
		if (this.state.isError==true) {
			errorShow = <Alert
		      message={this.state.reason}
		      type="error"
		      closable
		    />
		}
		return(
			<div>
				<div className="title">
					<h3>分类目录</h3>
				</div>
				<div className="title">
					<h4>添加新分类目录</h4>
					{errorShow}
					<div className="example-input">
						<Input size="small" placeholder="目录名"  style={{height:30}} onChange={this.classNameChange}/>
					</div>
					<div className="addButton">
						<Button type="primary" onClick={this.addClass}>Primary</Button>
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
					&nbsp;&nbsp;<Button type="primary" shape="circle" icon="search" />
				</div>
			</div>
			<div className="search">
					<Pagination size="small" total={10} showSizeChanger showQuickJumper />
			</div>
			<div>
				<ShowTable />
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