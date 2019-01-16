import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Home from './home';
import Test from './test';

const routes = (
  <Route component={SidebarExample}>
    <Route path="/test1/groups" component={Home}/>
    <Route path="/text1/users" component={Test}/>
  </Route>
)

class SidebarExample extends React.Component {
  render () {
    return (
      <div>
        {/* 这会是 <Users> 或 <Groups> */}
        {this.props.children}
      </div>
    )
  }
}
export default SidebarExample;
