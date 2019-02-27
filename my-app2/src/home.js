import React,{Component} from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies';
import HomeIndex from './homeIndex';
import ManageInvitation from './invitation/manageInvitation';
import ManageNews from './news/manageNews';
import NewsDetailView from './news/newsDetail';
import ManageAlbum from './album/manageAlbum';
import Photo from './album/managePhoto';
import DayDuty from './dayDuty/dayDuty';
import ShowCompetition from './competition/showCompetition';
import CompetitionDetail from './competition/competitionDetail';
import MyIndex from './myIndex';
import InvitationDetail from './invitation/invitationDetail';
import PP from './new';
require('./static/my/css/index.css');

require('./static/css/icomoon.css');
require('./static/css/home.css');
const arr = [{
    "title": "Home", "cssName": "", "result": true, "num": 0, "url":"/index", main: () => <HomeIndex />
    }, {
    "title": "新闻", "cssName": "", "result": false, "num": 1, "url":"/news", main: () => <ManageNews />
  }, {
    "title": "最近比赛", "cssName": "", "result": true, "num": 2, "url":"/competition", main: () => <HomeIndex />
  }, {
    "title": "荣誉", "cssName": "", "result": true, "num": 3, "url":"#", main: () => <HomeIndex />
  }, {
    "title": "吐槽", "cssName": "", "result": false, "num": 4, "url":"/inviatation", main: () => <ManageInvitation />
    },{
    "title": "关于OJ", "cssName": "", "result": false, "num": 5, "url":"#", main: () => <HomeIndex />
    },{
    "title": "讲座", "cssName": "", "result": false, "num": 6, "url":"#", main: () => <HomeIndex />
    },{
    "title": "值班", "cssName": "", "result": false, "num": 7, "url":"/dayDuty", main: () => <DayDuty />
    },{
    "title": "加入我们", "cssName": "", "result": false, "num": 8, "url":"#", main: () => <HomeIndex />
    },{
    "title": "照片", "cssName": "", "result": false, "num": 9, "url":"/album", main: ()=><ManageAlbum/>
    }
]
const routes = [{
    "title": "Home", "cssName": "", "result": true, "num": 0, "url":"/index", main: () => <HomeIndex />
    }, {
    "title": "新闻", "cssName": "", "result": false, "num": 1, "url":"/news", main: () => <ManageNews />
  }, {
    "title": "最近比赛", "cssName": "", "result": true, "num": 2, "url":"/competition", main: () => <ShowCompetition />
  }, {
    "title": "荣誉", "cssName": "", "result": true, "num": 3, "url":"#", main: () => <HomeIndex />
  }, {
    "title": "吐槽", "cssName": "", "result": false, "num": 4, "url":"/inviatation", main: () => <ManageInvitation />
    },{
    "title": "关于OJ", "cssName": "", "result": false, "num": 5, "url":"#", main: () => <HomeIndex />
    },{
    "title": "讲座", "cssName": "", "result": false, "num": 6, "url":"#", main: () => <HomeIndex />
    },{
    "title": "值班", "cssName": "", "result": false, "num": 7, "url":"/dayDuty", main: () => <DayDuty />
    },{
    "title": "加入我们", "cssName": "", "result": false, "num": 8, "url":"#", main: () => <HomeIndex />
    },{
    "title": "个人中心", "cssName": "", "result": false, "num": 9, "url":"/myIndex", main: () => <MyIndex />
    },{
    "title": "帖子详情", "cssName": "", "result": false, "num": 10, "url":"/invitationDetail/:id", main: (props) => <InvitationDetail {...props} />
    },{
    "title": "新闻详情", "cssName": "", "result": false, "num": 11, "url":"/newsDetail/:id", main: (props) => <NewsDetailView {...props} />
    },{
    "title": "相册", "cssName": "", "result": false, "num": 12, "url":"/album", main: ()=><ManageAlbum/>
    },{
    "title": "相册详情", "cssName": "", "result": false, "num": 13, "url":"/albumDetail/:id", main: (props) => <Photo {...props} />
    },{
    "title": "校赛详情", "cssName": "", "result": false, "num": 14, "url":"/competitionDetail/:id", main: (props) => <CompetitionDetail {...props} />
    }

]
var indexN=0;
const menu = (
  <Menu>
    <Menu.Item>
      <Link to="/myIndex">个人中心</Link>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">退出</a>
    </Menu.Item>
  </Menu>
);
class UserName extends React.Component{
  render() {
    return (
      <div>
        <ul>
          <li className="f-right">
          <Dropdown overlay={menu}>
            {
            this.props.image==''?<Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="large">
              {this.props.username}
            </Avatar>:<Avatar size="large" src= {this.props.image}>
            </Avatar>
          }
          </Dropdown>
          </li>
        </ul>
      </div>
    );
  }
}
class Login extends React.Component{
  render() {
    return (
      <div>
        <ul>
          <li className="f-right">
            <a href="/login">登陆</a>
          </li>
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
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
       haveUser: false,
       username:'',
        image:'',
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
          this.setState({image: data.resultBean.image});
          console.log('xxx'+this.state.username);

        } else {
          this.setState({haveUser: false});
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
      let user;
    let sign;
    console.log('have:'+this.state.haveUser);
    if (this.state.haveUser) {
      user=<UserName username={this.state.username} image={this.state.image} url='xx' />
    } else {
      user = <Login />
      sign = <Sign />
    }
      return(
    <Router basename="home">
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
                {user}
              </div>
            </div>
          </div>
        </div>
      </nav>
      </div>

        <div>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.url}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
        );
    }
}

 
export default Home;
