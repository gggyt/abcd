import React from 'react';
import cookie from 'react-cookies';
import { Icon, Modal, Avatar, Button, message,Pagination, Input, Row, Col, List, Card, Menu } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import E from 'wangeditor';
import MyInvitation from './invitation/myInvitation';
import {AddInvitation} from './config/router.js';
import {GetUserInfo} from './config/router.js';
import {SelectInvivation} from './config/router.js';
import {UploadImg1} from './config/router.js';
import {EventEmitter2} from 'eventemitter2';
import {UploadUserImgByMy} from './config/router.js';
import AvatarEditor from 'react-avatar-editor';
require('./static/css/style.css');
require('./static/css/bootstrap.min.css');
require('./static/my/css/invitation.css');
var emitter = new EventEmitter2()
var emitter2 = new EventEmitter2()
const { Meta } = Card;

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
class ManageImg extends React.Component{
	constructor(props) {
        super(props);
        this.state = ({
	      	haveUser: false,
	        username:'',
	        image:'',
	        visible: false,
	        realname:'',
        })
 	   this.onChange = this.onChange.bind(this);
 	   this.showModal = this.showModal.bind(this);
    }
	componentWillMount(){
	   this.getData();
	}
	showModal = (e) => {
	    console.log(e);
	    this.setState({
	      visible: true,
	    });
	}

	handleOk = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}

	handleCancel = (e) => {
	    console.log(e);
	    this.setState({
	      visible: false,
	    });
	}
	setEditorRef = (editor) => this.editor = editor
    onAvatarUpload=() => {
	    const reader = new FileReader();
	    reader.onload = (e) => {
	      const imgFile = e.target.result;
	      this.setState({
	        originImg: imgFile,
	      });
	    };
	    reader.readAsDataURL(this.file.input.files[0]);
 	}
	getData() {
	    console.log('token'+cookie.load('token'));
	    fetch(GetUserInfo, {
	      method: 'POST',
	      headers: {
	              'Authorization': cookie.load('token'),
	              'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	            },
	    }).then( res => res.json()).then(
	      data => {
	        //console.log('token'+cookie.load('token'));
	      //  window.alert(data);
	      //  window.alert(data.code);
	        if (data.code==0) {
	          this.setState({haveUser: true});
	          this.setState({username: data.resultBean.username});
	          this.setState({image: data.resultBean.image});
	          this.setState({realname: data.resultBean.realname});
	          console.log('xxx'+this.state.username);

	        } else {
	          console.log('未登录');
	          //        this.props.history.push('/login');
	        }
	      }
	  
	    )
	}
	onChange(e) {
	    e.preventDefault();
	    let files;
	    if (e.dataTransfer) {
	      files = e.dataTransfer.files;
	    } else if (e.target) {
	      files = e.target.files;
	    }
	    const reader = new FileReader();
	    reader.onload = () => {
	      this.setState({ src: files[0] });
	    };
	    reader.readAsDataURL(files[0]);
	}
	onClickSave = () => {
	    var tmp;
	    if (this.editor) {
	        const canvas = this.editor.getImage();
	        console.log(canvas);
	        const canvasScaled = this.editor.getImageScaledToCanvas();
	        var image = new Image();  
	    // canvas.toDataURL 返回的是一串Base64编码的URL
	    // 指定格式 PNG  
            image.crossOrigin = "*";
     		image =canvas.toDataURL("image/jpeg", 0.8);
      		const formData = new FormData()
     		formData.append('myFileName', dataURLtoFile(image, 'xx.jpg'));
	        fetch(UploadImg1,{   //Fetch方法
	        method: 'POST',
	        headers: {
	        },
	        body: formData
	        }).then(res => res.json()).then(
		          data => {
		          if (data.name!='') {
		            this.setState({image: data.url},()=>this.updateUserImage(data.url));
		            this.setState({loading: false});
		            //message.success(data.msg);
		          } 
	       })
	   	}
	    this.setState({
	      visible: false,
	    });
	  }
	  updateUserImage(image) {
	    fetch(UploadUserImgByMy,{   //Fetch方法
	      method: 'POST',
	      headers: {
	        'Authorization': cookie.load('token'),
	        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
	      },
	      body: 'image='+image
	      }).then(res => res.json()).then(
	        data => {
	          if(data.code==0) {
	          	message.success('成功');
	            this.setState({imageUrl: image});
	          } else {
	            message.error(data.msg);
	          }
	      }
	    )
	  };
	render(){
		return(
			<div>
				<div>
					<Meta
			            avatar={ 
			            	this.state.image!=''?<a><Avatar onClick={this.showModal} size={64} src={this.state.image} /></a>:
			            	<a><Avatar size={64} onClick={this.showModal} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >
             				 {this.state.username}</Avatar></a>
			            }
			            title={this.state.username}
			            description={this.state.realname}
			        />
			        <Modal
			          title="修改头像"
			          visible={this.state.visible}
			          onOk={this.onClickSave}
			          onCancel={this.handleCancel}
			        >
			        <div>
				        <input type="file" className="default" onChange={this.onChange} />
				        <AvatarEditor
				        image={this.state.src}
				        width={200}
				        height={200}
				        color={[248, 249, 250, 0.8]}
				        scale={1.0}
				        rotate={0}
				          ref={this.setEditorRef}
				          url={UploadImg1}
				        />
				    </div>
			        </Modal>
				</div>
			</div>
		);
	}
}

class MyInformation extends React.Component{
	render(){
		return(
			<div>
				<div className="invitationMain">
					<Row gutter={24}>
						<Col span={6}>
							<ManageImg/>
						</Col>
						<Col span={12}>
						</Col>
						<Col span={6}>
							<Button className="manageBtm" type="primary">编辑</Button>
							<Button className="plusFine" type="primary">签到</Button>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}
const routes = [{
    "num": 1, "url":"/myIndex/index", main: () => <h1>hello</h1>
    },{
    "num": 2, "url":"/myIndex/first", main: () => <h1>Hello</h1>
    },{
    "num": 3, "url":"/myIndex/invitation", main: () => <MyInvitation />
    }
]
class UserRoute extends React.Component{
	render() {
		return(
			<router basename="home">
			<div>
				<div style={{width:1000, margin: '0 auto', padding: 10}}>
					<Row gutter={24}>
						<Col style={{width:260}} className="backC">
		     	 			<Menu
					          style={{ width: 240 }}
					          defaultSelectedKeys={['1']}
					          defaultOpenKeys={['sub1']}
					          mode="inline"
					          theme="light"
					        >
					          <Menu.Item key="1">
						          <Link to="/myIndex/first"> 
						          <Icon type="home" style={{ color: 'hotpink' }}/>首页
						          </Link>
					          </Menu.Item>
					          <Menu.Item key="2">
						        <Link to="/myIndex/invitation"> 
					            <Icon type="calendar" style={{ color: '#52c41a' }} />
					            讨论帖
					            </Link>
					          </Menu.Item>
					          <Menu.Item key="3">
					            <Icon type="message" theme="twoTone" />
					            留言
					          </Menu.Item>
					        </Menu>
		     	 		</Col>

		     	 		<Col style={{width:730}} className="backC">
			     	 			{routes.map((route, index) => (
					            // Render more <Route>s with the same paths as
					            // above, but different components this time.
					            <Route
					              key={index}
					              path={route.url}
					              exact={route.exact}
					              component={route.main}
					            />
					          ))}	
		     	 		</Col>
	     	 		
	     		 </Row>
				</div>
			</div>
			</router>
		);
	}
}
class MyIndex extends React.Component{

	render() {
		return(
		<div className="bodyMain">
			<div >
				<MyInformation />
			</div>
			<div>
				<UserRoute />
			</div>
		</div>
		);
	}
}

export default MyIndex;