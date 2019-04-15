import React from 'react';
import { Menu, Icon, Button, Input, Checkbox, Row, Col } from 'antd';
import { List, InputItem, WhiteSpace } from 'antd-mobile';
import { createForm } from 'rc-form';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cookie from 'react-cookies';
import E from 'wangeditor';
import {AddNewsMain} from './config/router.js';
import {UpdateNewsMain} from './config/router.js';
import {SelectClass} from './config/router.js';
const Item = List.Item;
const Brief = Item.Brief;

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
      alert(data.code)
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
   
 
    render() {
      let user;
    if (this.state.haveUser) {
      user=<h1>11</h1>
    } else {
      user = <h1>222</h1>
    }
      return(
              <div >
                {user}
              </div>
            
        );
    }
}

class AddNews extends React.Component {
  componentDidMount() {
    // this.autoFocusInst.focus();
  }
  handleClick = () => {
    this.inputRef.focus();
  }
  render() {
    return (
      <div>
        
        <List renderHeader={() => 'Custom title（text / image / empty)'}>
          <InputItem
            placeholder="no label"
          />
          
        </List>

        
      </div>
    );
  }
}

class Test extends React.Component {
  state = {
    disabled: false,
  }

  render() {
    return (<div>
    <AddNews />
    </div>);
  }
}


export default Test;