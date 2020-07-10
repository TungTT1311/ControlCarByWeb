// Updated. Thanks to: Paul Luna
import React, { Component } from "react";
import socketIOClient from "socket.io-client";
const socket = socketIOClient('localhost:4001');

class App extends Component {
  constructor() {
    super();
    this.state = {
      ///
      direction: 'unknown'
      ///   

    };
  }
  // sending sockets
  handle_stop(){
    this.setDirection("stop")
    socket.emit('change direction', 'stop')
  }
  handle_up(){
    if(this.state.direction === "left")
      socket.emit('change direction', 'up_left') 
    else if(this.state.direction === "right")
      socket.emit('change direction', 'up_right') 
    else 
      socket.emit('change direction', 'up') 
    this.setDirection("unknown")
  }
  handle_down(){
    if(this.state.direction === "left")
      socket.emit('change direction', 'down_left') 
    else if(this.state.direction === "right")
      socket.emit('change direction', 'down_right') 
    else 
      socket.emit('change direction', 'down') 
    this.setDirection("unknown")
  }
  // adding the function
  setDirection = (direction) => {
    this.setState({ direction })
  }
  componentDidMount = () => {
      const socket = socketIOClient('localhost:4001');
      socket.on('change direction', (col) => {
          console.log("ok")
      })
}
  render() {
    // testing for socket connections

    // const socket = socketIOClient(this.state.endpoint);

    return (
      <div>
      <div className ="title">Control Car</div>
      <div className="buttonn" style={{ textAlign: "center" }}>
        <div  href="#" className="stop"><i className="far fa-circle"  onClick={() => this.handle_stop()}></i></div>
        <div  href="#" className="left"><i className="fas fa-chevron-left"  onClick={() => this.setDirection("left")}></i></div>
        <div  className="right"><i className="fas fa-chevron-right" onClick={() => this.setDirection("right")}></i></div>
        <div  className="down"><i className="fas fa-chevron-down" onClick={() => this.handle_down()}></i></div>
        <div  className="up"><i className="fas fa-chevron-up" onClick={() => this.handle_up()}></i></div>
      </div>
      </div>
    )
  }
}
export default App;


