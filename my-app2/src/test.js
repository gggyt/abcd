import React, {Component,PropTypes} from 'react'
import ReactDom from 'react-dom'
import {EventEmitter2} from 'eventemitter2'

var emitter = new EventEmitter2()

class Parent extends Component{
 
    constructor(props) {
        super(props);
        this.state = {
            msg: 'start'
        };
    }
    
    
    transMsg(types){
            var newOrders = [];
        for(let type of types){
            if(type)
            alert(type);
        }
        
        
      }

  render() {
    return <Child parms={this.state.msg} ptransMsg={this.transMsg.bind(this)}/>;
  }
}



class Child extends Component{
    
     constructor(props) {
        super(props);
        // call parent component
        //console.log("parms :",this.props.parms);
        this.click = this.click.bind(this);
    }

    click() {
       this.props.ptransMsg("hi");

    }
  render() {
    return <p onClick={this.click}>{this.props.parms}</p>
  }
}

class Test extends Component{
  render() {
    return (
    <div>
    <Parent />
    <Child />
    </div>
    );
  }
}

export default Test;