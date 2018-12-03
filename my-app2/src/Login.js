import React from 'react';
import cookie from 'react-cookies';
require('./static/css/style.css');
require('./static/css/bootstrap.min.css');
require('./static/my/css/login.css');

class Reason extends React.Component{
	render() {
		return (
			<div className="form-group">
				<div className="alert alert-danger" role="alert" id="message">
					{this.props.reason}
				</div>
			</div>
		);
	}
}

class Login extends React.Component{

	constructor(props) {
		super(props);
		this.state={
			username: '',
			password: '',
			fail: false,
			failReason: 'xx',
			formValid: false
		}
		this.usernameChange = this.usernameChange.bind(this);
		this.passwordChange = this.passwordChange.bind(this);
		this.submit = this.submit.bind(this);
	}

	usernameChange(e) {
		this.setState({username: e.target.value})
	}
	passwordChange(e) {
		this.setState({password: e.target.value})
	}
	
	 submit(e) {
	// 	window.alert(this.state.username)
	// 	window.alert(this.state.password)
		//e.preventDefault();
		e.preventDefault();
	 	this.getDate();
	}

	getDate() {
		let text = {username:this.state.username,password:this.state.password} //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        fetch(`http://127.0.0.1:8081/login`,{   //Fetch方法
            method: 'POST',
            headers: {
            	'Access-Token': 'xx',
            	'Content-Type': 'application/json; charset=utf-8'
            },
            body: send
        }).then(res => res.json()).then(
            data => {
                if(data.success) {
                	window.alert('验证成功，欢迎登录');
                	alert(cookie.load('token'));
                	this.props.history.push('/main');
                }
                else {
                	//cookie.remove('token');

                	this.setState({fail: true});
                	this.setState({failReason: data.success.toString()});
                	return false;
                }
            }
        )
	}

	render() {

		let reason;
		if (this.state.fail) {
			reason = <Reason reason={this.state.failReason}/>;
		}
		return(
			<div className="backg bai">
			<div className="container">
			
				<div className="row">
					<div className="col-md-4 col-md-push-8">
						

						<form  className="fh5co-form animate-box" data-animate-effect="fadeInRight" id="formLogin">
							<h2>登 陆</h2>
							{reason}
							<div className="form-group">
								<label  className="sr-only">Username</label>
								<input type="text" className="form-control" id="username" placeholder="Username" onChange={this.usernameChange} autocomplete="off"/>
							</div>
							<div className="form-group">
								<label  className="sr-only">Password</label>
								<input type="password" className="form-control" id="password" placeholder="Password" onChange={this.passwordChange} autocomplete="off"/>
							</div>
							<div className="form-group">
								<label ><input type="checkbox" id="remember" /> 记住我</label>
							</div>
							<div className="form-group">
								<p>未注册? <a href="sign-up3.html">注册</a> | <a href="forgot3.html">忘记密码?</a></p>
							</div>
							<div className="form-group">
								<input type="submit" value="Sign In" className="btn btn-primary" id="login" onClick={this.submit} />
							</div>
						</form>


					</div>
				</div>
				<div className="row last" >
					<div className="col-md-12 text-center"><p><small className="font-size">&copy;CUIT-ACM.GYT</small></p></div>
				</div>
		</div>
		</div>
		);
	}
}

export default Login;