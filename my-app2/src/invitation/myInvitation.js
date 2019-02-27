import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List } from 'antd';
import E from 'wangeditor';
import {AddInvitation} from '../config/router.js';
import {SelectInvivation} from '../config/router.js';
import {DeleteInvitation} from '../config/router.js';
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
	delete(id){
		fetch(DeleteInvitation,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Authorization': cookie.load('token'),
            	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
            },
			body: 'invitationId='+id

        }).then(res => res.json()).then(
            data => {
				//window.alert('code'+data.code);
                if(data.code==0) {
                	message.success(data.msg);
                }
                else {
                	message.error(data.msg);
                }
            }
        )
        emitter2.emit('getInvitation', 'change')
	}
	render(){
		return(
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
			          title={<div><a href={'/home/invitationDetail/'+item.invitationId} target="_blank">{item.invitationTitle}&nbsp;</a>
				          {item.isFirst==1?<span className="disTop">置顶</span>:null}
				          {item.isGreate!=0?<span className="plusFine">精</span>:null}
				          <a className="floatR" onClick={()=>this.delete(item.invitationId)}>删除</a>
				      </div>}
			          description={<p>{item.createUser}&nbsp;&nbsp;&nbsp;{item.createDate}</p>}
			        />
			      </List.Item>
			    )}
			  />
			</div>
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
	      body: 'invitationTitle='+this.state.invitaionTitle+'&pageNum='+this.state.nowPage+'&getMy=1'
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
		<div >
      		
     	 		<ShowInvitation invitationAll={this.state.invitationAll}/>
     	 			<div className="floatR">
     	 				<Pagination size="small" onChange={this.pageChange} total={this.state.totalPage*this.state.pageSize} defaultCurrent={this.state.nowPage}  />
     	 			</div>
     	 		
    	  </div>
		);
	}
}

class MyInvitation extends React.Component{

	render() {
		return(
		
			
			<div>
				<AllInvitationView/>
			</div>
		);
	}
}

export default MyInvitation;