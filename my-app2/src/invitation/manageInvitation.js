import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import E from 'wangeditor';
import {AddInvitation} from '../config/router.js';
import {SelectInvivation} from '../config/router.js';
import {EventEmitter2} from 'eventemitter2'
require('../static/css/style.css');
require('../static/css/bootstrap.min.css');
require('../static/my/css/invitation.css');
var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()

class AddView extends React.Component{
	constructor(props){
		super(props);
		this.state={
			invitationTitle:'',
			invitationBody:'',
			editor:'',
		}
		this.invitationTitleChange = this.invitationTitleChange.bind(this);
		emitter.on('blank', this.blank.bind(this));
	}
	componentDidMount() {
	    const elem = this.refs.editorElem;
	    const editor = new E(elem);
	    this.setState({editor:editor});
		 editor.customConfig.uploadImgShowBase64 = false   // 使用 base64 保存图片
		 editor.customConfig.uploadFileName = 'myFileName';
		editor.customConfig.uploadImgServer = 'http://localhost:9999/uploadImg';
		editor.customConfig.uploadImgHooks = { 
			customInsert: function (insertImg, result, editor) { 
			var url =result.data; insertImg(url); 
			} 
		};

	    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
	    editor.customConfig.onchange = html => {
	      //window.alert(editor.txt.text());
	      this.setState({
	        editorContent: html
	      })
	      console.log(this.state.editorContent);
	      console.log(editor.txt.text());
	      this.props.pinvitationBodyChange(html, editor.txt.text());
	    }
	    editor.create()
    }
	blank(msg) {
		console.log('emit:'+msg);
		this.setState({invitationTitle: ''});
		this.setState({invitationBody: ''});
		this.setState({invitationBodyText: ''});
		this.state.editor.txt.html('');
	}
	invitationTitleChange(e) {
		this.setState({invitationTitle: e.target.value});
		this.props.pinvitationTitleChange(e.target.value);
		console.log(this.state.invitationTitle);
	}
	render(){
		return(
			<div>
				<div className="form-inline form" role="form"> 
			        <div className="form-group"> 
				        <span className="form-label">标题:&nbsp;&nbsp;</span> 
				        <Input value={this.state.invitationTitle} className="form-control" placeholder="一句话描述帖子" style={{height:30 , width:600}} onChange={this.invitationTitleChange}/>
				    </div>
				           
			    </div>
			    <div>
					<div id="test" ref="editorElem" className="toolbar" >
       				</div>  
				</div>
			</div>
		);
	}
	
}
function getString(htmls) {
	let div = document.createElement("div");
	div.innerHTML = htmls;
	const text = div.textContent || div.innerText || "";
	return text.substring(0, 50);
}
class AddInvitationView extends React.Component{
	constructor(props){
		super(props);
		this.state={
			invitationTitle:this.props.invitationTitle,
			invitationBody:'',
			invitationBodyText:'',
			editor:'',
		}
		this.invitationTitleChange = this.invitationTitleChange.bind(this);
		this.invitationBodyChange = this.invitationBodyChange.bind(this);
	}
	invitationTitleChange(key) {
		//this.setState({success: 0});
		this.setState({invitationTitle: key});
		console.log('--'+this.state.invitationTitle);
	}
	invitationBodyChange(key, text) {
		//this.setState({success: 0});
		this.setState({invitationBody: key});
		this.setState({invitationBodyText: text});
		console.log('--'+this.state.invitationBody);
		console.log('--'+this.state.invitationBodyText);

	}
	state = { visible: false }

	showModal = () => {
	    this.setState({
	      visible: true,
	    });
	}

	handleOk = (e) => {
		if (this.state.invitationTitle.length==0) {
			message.error('请输入标题',2);
			return;
		}
		if (this.state.invitationBodyText.length==0) {
			message.error('请输入内容', 2);
			return;
		}
		let hide = message.loading('正在执行中...', 0);
                	setTimeout(hide, 2000);
		fetch(AddInvitation,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'invitationTitle='+this.state.invitationTitle+'&invitationBody='+encodeURI(this.state.invitationBody)

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
                	setTimeout(hide)
					message.success('添加成功');
				    this.setState({invitationTitle: ''});
				    this.setState({invitationBody: ''});
				    this.setState({invitationBodyText: ''});
				    emitter.emit('blank', 'blank');
				    emitter2.emit('getInvitation', 'get');
				    this.setState({visible: false});
                }
                else {
                	message.error(data.msg);
                }
            }
        )
	    console.log(e);
	    
	}

	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
	render(){
		return(
			<div>
				<div className="invitationMain">
					<span className="spanB">吐槽</span>
					<Button type="primary" className="floatR" onClick={this.showModal}>添加帖子</Button>
					<Modal
			            title="添加帖子"
			            width={900}
			            visible={this.state.visible}
			            onOk={this.handleOk}
			            onCancel={this.handleCancel}
			            okText="确认"
			            cancelText="取消"
			          >
			          	<AddView pinvitationTitleChange={this.invitationTitleChange} pinvitationBodyChange={this.invitationBodyChange}
			          		/>
			        </Modal>
				</div>
			</div>
		);
	}
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
			    dataSource={this.props.invitationAll}
			    renderItem={item => (
			      <List.Item
			        key={item.title}
			        actions={[<IconText type="eye" text={item.readNum} />, <IconText type="message" text={item.agreeNum} />]}
			        >
			        <List.Item.Meta
			          avatar={
			          	item.imageUrl==''?<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
			              {item.createUser}
			            </Avatar>:<Avatar size="large" src= {item.imageUrl}>
			            </Avatar>
			          }
			          title={<div> <Link to={'/invitationDetail/'+item.invitationId}>{item.invitationTitle}&nbsp;</Link>
				          {item.isFirst==1?<span className="disTop">置顶</span>:null}
				          {item.isGreate!=0?<span className="plusFine">精</span>:null}
				      </div>}
			          description={<p>{item.createUser}&nbsp;&nbsp;&nbsp;{item.createDate}</p>}
			        />
			        {getString(item.invitationBody)}
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
		    dataSource={this.props.invitationAll}
		    renderItem={item => (
		      <List.Item>
		        <List.Item.Meta
		          title={<a href={'/home/invitationDetail/'+item.invitationId} target="_blank">{item.invitationTitle}</a>}
		          description={<p>发表于{item.createDate}</p>}
		        />
		      </List.Item>
		    )}
		  />
		);
	}
}
class AllInvitationView extends React.Component{
	constructor(props) {
	    super(props);
	    this.state={
	      invitationAll:[],
	      invitationFirst:[],
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
		fetch(SelectInvivation,{
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
	          this.setState({invitationAll:data.resultBean.items})
	        } 
	        else {
	          alert(data.msg);
	        }
	      }
	    )
	    fetch(SelectInvivation,{
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
	          this.setState({invitationFirst:data.resultBean.items})
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
     	 		<ShowInvitation invitationAll={this.state.invitationAll}/>
     	 			<div className="floatR">
     	 				<Pagination size="small" onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize} defaultCurrent={this.state.nowPage}  />
     	 			</div>
     	 		</Col>
     	 		<Col style={{width:260}} className="backC">
     	 			<ShowRight invitationAll={this.state.invitationFirst}/>
     	 		</Col>
     		 </Row>
    	  </div>
		);
	}
}

class ManageInvitation extends React.Component{

	render() {
		return(
		<div className="bodyMain">
			<div >
				<AddInvitationView />
			</div>
			<div>
				<AllInvitationView/>
			</div>
		</div>
		);
	}
}

export default ManageInvitation;