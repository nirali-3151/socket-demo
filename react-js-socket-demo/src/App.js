import "./App.css";
import React, { Component } from 'react';
import {socket} from "./assets/socket/socket_link"

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: "",
      room: "",
      userName: "",
      title: "",
      messageList: []
    }
  }

  componentDidMount() {
    const { messageList } = this.state
    socket.on("receive_message", (data) => {
      this.setState({ messageList: [...messageList, data] });
    });
  }

  sendMessage = async () => {
    const { room, userName, title, messageList } = this.state
    let messageContent = {
      room: room,
      content: {
        author: userName,
        title: title,
      },
    };

    await socket.emit("send_message", messageContent);
    this.setState({ messageList: [...messageList, messageContent.content] });
    this.setState({ title: "" })
  }

  componentDidUpdate(prevProps, prevState) {
    const {messageList} = this.state
    console.log("messageList" ,messageList);
    // console.log("prevState", prevState);
    const isDiff = prevState.messageList.length !== this.state.messageList.length
    if (isDiff) {
      const { messageList } = this.state
      socket.on("receive_message", (data) => {
        this.setState({ messageList: [...messageList, data] });
      });
    }
  }

  connectToRoom = () => {
    const { room } = this.state
    this.setState({ loggedIn: true });
    socket.emit("join_room", room);
  }

  //handle value of input feild
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { loggedIn, userName, room, messageList, title } = this.state
    return (
      <div className="App">
        {!loggedIn ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Name..."
                name="userName"
                value={userName}
                onChange={this.onChangeHandler}
              />

              <input
                type="text"
                placeholder="Room..."
                name="room"
                value={room}
                onChange={
                  this.onChangeHandler
                }
              />
            </div>
            <button onClick={() => this.connectToRoom()}>Enter Chat</button>
          </div>
        ) : (
          <div className="chatContainer">
            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                value={title}
                name="title"
                onChange={this.onChangeHandler}
              />
              <button onClick={() => this.sendMessage()}>Send</button>
            </div>

            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author == userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.title}
                    </div>
                  </div>
                );
              })}
            </div>


          </div>
        )}
      </div>
    );
  }
}

export default App;