import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List , Card, Divider,Comment,Form ,Empty} from 'antd';
import E from 'wangeditor';
import {NewsDetail} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2'
require('../static/css/style.css');
require('../static/css/bootstrap.min.css');
require('../static/my/css/invitation.css');
var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
var emitterComment = new EventEmitter2()
const { Meta } = Card;
const TextArea = Input.TextArea;

class InvitationView extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			newsTitle:'',
			newsBody:'',
			createUser:'',
			createDate:'',
		}
	}

	componentDidMount(){
		this.getInvitation();
	}
	getInvitation() {
		fetch(NewsDetail,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'newsId='+this.props.newsId

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
                	this.setState({newsTitle:data.resultBean.newsTitle});
                	this.setState({newsBody:data.resultBean.newsBody});
                	this.setState({createUser:data.resultBean.createUser});
                	this.setState({createDate:data.resultBean.createDate});
                }
                else {
                	message.error(data.msg);
                }
            }
        )
	}
	render() {
		return(
			<div className="backCD">
				<div style={{padding:20}} >
					<Icon type="pushpin" theme="twoTone" />&nbsp;<span style={{fontSize:"25px"}}>{this.state.newsTitle}</span>
				</div>
				<div>
					<Meta 
		            title={this.state.newsTitle}
		            description={ <div><span>管理员发表于{this.state.createDate}</span>
		           </div>}/>
		        </div>
		        <hr/>
		        <div>
		       		<div className="inBody" dangerouslySetInnerHTML={{__html: this.state.newsBody}} />
		        </div>
			</div>
		);
	}
}

class Tmp extends React.Component{
	render(){
		return(
			<div>
				<InvitationView newsId={this.props.newsId}/>
			</div>
		);
	}
}
class Xx extends React.Component{
	render(){
		return(
			<div className="backCD">
				111
			</div>
		);
	}
}
class Kuang extends React.Component{
	render() {
		return(
			<div style={{width:1000, margin: '0 auto', padding: 10}}>
				<div >
	      		<Row gutter={24}>
	      			<Col className="gutter-row" span={19}>
	     	 			<Tmp newsId={this.props.newsId}/>
	     	 		</Col>
	     	 		<Col className="gutter-row"  span={5} className="backCD">
	     	 			<Xx/>
	     	 		</Col>
	     		 </Row>
	     		 </div>
	
    	   </div>
		);
	}
}	
class NewsDetailView extends React.Component{
    state={
     id:1
	}
	componentwillreceiveprops(nextProps){
		console.log(nextProps);
	}
	render() {
		console.log(this.props.match);
		console.log(this.props.match.params.id);
		return(
			<div className="bodyMain">
				<div>
					<Kuang newsId={this.props.match.params.id}/>
					{this.state.id}
				</div>
			</div>
		);
	}
}

export default NewsDetailView;