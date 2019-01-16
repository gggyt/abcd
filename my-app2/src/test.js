import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
import DatePicker from 'antd/lib/date-picker'; 
import 'antd/lib/date-picker/style/css'; 
import 'antd/dist/antd.css';
import './back/static/my/css/home.css';
import routes from './back/config/backHomeConf';

const SubMenu = Menu.SubMenu;


class Test extends React.Component {
  state = {
    collapsed: false,
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
    <Router  basename="test">
    <div>
    <div><h5>1111</h5></div>
      <div  className="boxB">
      <div className="left">
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <SubMenu key="sub1" title={<span><Icon type="desktop" /><span>新闻</span></span>}>
            <Menu.Item key="6">
            <Link to="/classify">目录</Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link to = "/addNews">添加新闻</Link>
            </Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            // Render more <Route>s with the same paths as
            // above, but different components this time.
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
      </div>
      </Router>
    );
  }
}

export default Test;