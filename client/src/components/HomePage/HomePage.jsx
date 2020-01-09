import React, { Component } from "react";
import io from "socket.io-client";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

class HomePage extends Component {
  state = {
    messages: ["Hello and Welcome"],
    message: ""
  };

  componentDidMount = () => {
    socket.on("message", msg => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = () => {
    const { message } = this.state;
    if (message !== "") {
      this.setState({
        message: ""
      });
      socket.emit("message", message);
    } else {
      alert("Please Add A Message");
    }
  };

  render() {
    const { messages, message } = this.state;
    return (
      <div>
        {messages.length > 0 &&
          messages.map(msg => (
            <div>
              <p>{msg}</p>
            </div>
          ))}
        <input
          value={message}
          name="message"
          onChange={e => this.onChange(e)}
        />
        <button onClick={() => this.onClick()}>Send Message</button>
      </div>
    );
  }
}
export default HomePage;
