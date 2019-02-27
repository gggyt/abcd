import React,{Component} from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies';
import HomeIndex from './homeIndex';
import PP from './new';

require('./static/css/icomoon.css');
require('./static/css/home.css');
const arr = [{
    "title": "Home", "cssName": "", "result": true, "num": 0, "url":"/index", main: () => <HomeIndex />
    }, {
    "title": "新闻", "cssName": "", "result": false, "num": 1, "url":"/1", main: () => <h1>11</h1>
  }, {
    "title": "BLOG", "cssName": "", "result": true, "num": 2, "url":"#", main: () => <HomeIndex />
  }, {
    "title": "荣誉", "cssName": "", "result": true, "num": 3, "url":"#", main: () => <HomeIndex />
  }, {
    "title": "吐槽", "cssName": "", "result": false, "num": 4, "url":"#", main: () => <HomeIndex />
    },{
    "title": "关于OJ", "cssName": "", "result": false, "num": 5, "url":"#", main: () => <HomeIndex />
    },{
    "title": "讲座", "cssName": "", "result": false, "num": 6, "url":"#", main: () => <HomeIndex />
    },{
    "title": "值班", "cssName": "", "result": false, "num": 7, "url":"#", main: () => <HomeIndex />
    },{
    "title": "加入我们", "cssName": "", "result": false, "num": 8, "url":"#", main: () => <HomeIndex />
    }
]

var indexN=0;

class UserName extends React.Component{
  render() {
    return (
      <div>
        <ul>
          <li className="f-right"><a href="#">{this.props.username}{this.props.url}</a></li>
        </ul>
      </div>
    );
  }
}
class Sign extends React.Component{
  render() {
    return (
      <div>
        <ul>
          <li className="f-right"><a href="/register">注册</a></li>
        </ul>
      </div>
    );
  }
}
class SidebarExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
      haveUser: false,
      username:'',
      
        })
    }

  componentWillMount(){
    this.getData();
  }
  getData() {
    console.log('token'+cookie.load('token'));
    fetch('http://localhost:9999/userLogin/getUserInfo', {
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
          console.log('xxx'+this.state.username);

        } else {
          console.log('未登录');
          //        this.props.history.push('/login');
        }
      }
  
    )
  }
    fn(data, num) {
        this.setState({
            parentText: data
        },() =>{
           console.log('---');
        });
    console.log(num);
    console.log(arr);
    arr[indexN].cssName = '';
    arr[num].cssName = 'active';
    console.log(arr[num].text);
        this.setState({arr, arr});
    indexN = num;
    console.log(indexN);
    }
 
 
 
    render() {
      let userName;
    let sign;
    console.log('have:'+this.state.haveUser);
    if (this.state.haveUser) {
      userName=<UserName username={this.state.username} url='xx' />
    } else {
      userName = <UserName username='登录' url='xx' />
      sign = <Sign />
    }
      return(
    <Router basename="SidebarExample">
    <div>
      <div >
      <nav className="colorlib-nav" role="navigation">
        <div className="top-menu">
          <div className="container">
            <div className="row">
              <div className="col-xs-2">
                <div id="colorlib-logo"><a href="index.html">CUIT-ACM</a></div>
              </div>
              <div className="col-xs-8 text-right menu-1">

            <div className="list">
                <ul>
                    <li>
                      {
                        arr.map(item => {
                            return (
                                <li className={item.cssName} onClick={this.fn.bind(this, item.title, item.num)}>
                                    <Link to={item.url}>{item.title}</Link>
                                </li>
                            )
                        })
                    }
                    </li>
                </ul>
                
            </div>
              </div>
              <div className="col-xs-2">
                {sign}
                {userName}
              </div>
            </div>
          </div>
        </div>
      </nav>
      </div>

        <div >
          {arr.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.url}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
        );
    }
}


 
export default SidebarExample;
