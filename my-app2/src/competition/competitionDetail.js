import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List , Card, Divider,Comment,Form ,Empty} from 'antd';
import E from 'wangeditor';
import {DetailCompetitionUrl} from '../config/router.js';
import {JoinCompetitionUrl} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2';
require('../static/css/style.css');
require('../static/css/bootstrap.min.css');
require('../static/my/css/invitation.css');
const { Meta } = Card;
const TextArea = Input.TextArea;

var emitter = new EventEmitter2()
var num=0;
class InvitationView extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			competitionTitle:'',
			competitionBody:'',
			joinUserNum:'',
		}
		emitter.on('changeInfo', this.changeInfo.bind(this))
	}
	changeInfo(){
		this.getInvitation();
	}
	componentDidMount(){
		this.getInvitation();
	}
	getInvitation() {
		fetch(DetailCompetitionUrl,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'competitionId='+this.props.competitionId

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
                	this.setState({competitionTitle:data.resultBean.competitionTitle});
                	this.setState({competitionBody:data.resultBean.competitionBody});
                	this.setState({joinUserNum:data.resultBean.joinUserNum});
                	emitter.emit('changNum', data.resultBean.joinUserNum, data.resultBean.isDone);
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
				<div style={{padding:20, margin: '0 auto'}} >
					<center><p style={{fontSize:"25px"}}>{this.state.competitionTitle}</p></center>
				</div>
				<div>
					{this.state.createDate}
		        </div>
		        <hr/>
		        <div style={{margin:20}}>
		       		<div className="inBody" dangerouslySetInnerHTML={{__html: this.state.competitionBody}} />
		        </div>
			</div>
		);
	}
}

class Tmp extends React.Component{
	render(){
		return(
			<div>
				<InvitationView competitionId={this.props.competitionId}/>
			</div>
		);
	}
}
class Xx extends React.Component{
	constructor(props){
		super(props);
		this.state={
			joinUserNum:0,
			isDone:1,
		}
		this.join = this.join.bind(this);
		emitter.on('changNum', this.changeJoin.bind(this));
	}
	changeJoin(key, isDone){
		this.setState({joinUserNum:key})
		this.setState({isDone:isDone})
	}
	join (){
		fetch(JoinCompetitionUrl,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'competitionId='+this.props.competitionId

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
                	message.success(data.msg);
                	emitter.emit('changeInfo', '1')
                }
                else {
                	message.error(data.msg);
                }
            }
        )
	}
	render(){
		let but;
		if (this.state.isDone==1) {
			but = <Button type="primary" block onClick={this.join}>点击报名</Button>
		} else {
			but = <Button type="danger" block disabled >报名结束</Button>
		}
		return(
			<div className="backCBai">
				<div style={{marginTop:10}}>
					<center><p>共报名{this.state.joinUserNum}人</p></center>
				</div>
				<div style={{marginTop:20, marginBottom:20}}>
					{but}
				</div>
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
	     	 			<Tmp competitionId={this.props.competitionId}/>
	     	 		</Col>
	     	 		<Col className="gutter-row"  span={5} className="backCD">
	     	 			<Xx competitionId={this.props.competitionId}/>
	     	 		</Col>
	     		 </Row>
	     		 </div>
	
    	   </div>
		);
	}
}	
class CompetitionDetail extends React.Component{
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
					<Kuang competitionId={this.props.match.params.id}/>
				</div>
			</div>
		);
	}
}

export default CompetitionDetail;