import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import E from 'wangeditor';
import {AddInvitation} from '../config/router.js';
import {SelectNewsMain} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2'
require('../static/css/style.css');
require('../static/css/bootstrap.min.css');
require('../static/my/css/invitation.css');
var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()

function getString(htmls) {
	let div = document.createElement("div");
	div.innerHTML = htmls;
	const text = div.textContent || div.innerText || "";
	return text.substring(0, 50);
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class ShowInvitation extends React.Component{
	constructor(props){
		super(props);
	}
	tmp(key){
		this.props.history.push("/home")
		var $this = this
		setTimeout(function(){
		$this.props.history.push("/destination/"+key)
		},100)
	}
	render(){
		return(
		<router basename="home">
			<div>
				<List
			    itemLayout="vertical"
			    size="large"
			    dataSource={this.props.newsAll}
			    renderItem={item => (
			      <List.Item
			        key={item.title}
			        >
			        <List.Item.Meta
			          
			          title={<div> <Link to={'/newsDetail/'+item.newsId} >{item.newsTitle}&nbsp;</Link>
				      </div>}
			          description={<p>管理员发布于&nbsp;&nbsp;&nbsp;{item.createDate}</p>}
			        />
			        {getString(item.newsBody)}
			      </List.Item>
			    )}
			  />
			</div>
		</router>
		);
	}
}
class ShowRight extends React.Component{
	render(){
		return(
			<List
		    itemLayout="horizontal"
		    dataSource={this.props.newsAll}
		    renderItem={item => (
		      <List.Item>
		        <List.Item.Meta
		          title={<a href={'/home/newsDetail/'+item.newsId} target="_blank">{item.newsTitle}</a>}
		          description={<p>发表于{item.createDate}</p>}
		        />
		      </List.Item>
		    )}
		  />
		);
	}
}
class AllNewsView extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
	      newsAll:[],
	      newsFirst:[],
	      nowPage: 1,
	      totalPage: 1,
	      pageSize: 10,
	      invitaionTitle:'',
	    }
	    emitter2.on('getInvitation', this.getI.bind(this));
 	 }
 	getI(ky) {
 		this.getInvitation();
 	}
	componentWillMount() {
	    this.getInvitation();
	}
	getInvitation() {
		fetch(SelectNewsMain,{
	      method: 'POST',
	      headers: {
	        'Authorization': cookie.load('token'),
	        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	      },
	      body: 'invitationTitle='+this.state.invitaionTitle+'&pageNum='+this.state.nowPage
	    }).then(res => res.json()).then(
	      data=>{
	        if (data.code==0) {
	          //alert(data.msg);
	           this.setState({nowPage: data.resultBean.currentPage});
         	  this.setState({totalPage: data.resultBean.totalItems/data.resultBean.pageSize});
	          this.setState({newsAll:data.resultBean.items})
	        } 
	        else {
	          alert(data.msg);
	        }
	      }
	    )
	    fetch(SelectNewsMain,{
	      method: 'POST',
	      headers: {
	        'Authorization': cookie.load('token'),
	        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	      },
	      body: 'invitationTitle='+this.state.invitaionTitle+'&pageNum='+1
	    }).then(res => res.json()).then(
	      data=>{
	        if (data.code==0) {
	          //alert(data.msg);
	          this.setState({newsFirst:data.resultBean.items})
	        } 
	        else {
	          alert(data.msg);
	        }
	      }
	    )
	}
	pageChange = (page) => {
	    console.log(page);
	    this.setState({ nowPage: page }, () => this.getInvitation());
	     document.documentElement.scrollTop =0;
	}
	render(){
		return(
		<div style={{width:1000, margin: '0 auto', padding: 10}}>
      		<Row gutter={24}>
     	 		<Col style={{width:730}} className="backC">
     	 		<ShowInvitation newsAll={this.state.newsAll}/>
     	 			<div className="floatR">
     	 				<Pagination size="small" onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize} defaultCurrent={this.state.nowPage}  />
     	 			</div>
     	 		</Col>
     	 		<Col style={{width:260}} className="backC">
     	 			<ShowRight newsAll={this.state.newsFirst}/>
     	 		</Col>
     		 </Row>
    	  </div>
		);
	}
}

class ManageNews extends React.Component{

	render() {
		return(
		<div className="bodyMain">
			<div>
				<AllNewsView/>
			</div>
		</div>
		);
	}
}

export default ManageNews;