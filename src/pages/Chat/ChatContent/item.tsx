import React, { Component, useState } from "react";
import Avatar from "../ChatList/Avatar";
import { socket } from "../../../socket";

const ChatItem = (props:any) => {

  const [test, setTest] = useState('------')

  socket.on(`65b20bdeca1e0619453d9ab0-played`, async (data) => {
    console.log(data)
    return setTest(JSON.stringify(data))
  });

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
    >
      <div className="chat__item__content">
        <div className="chat__msg">{props.msg}</div>
        <div className="chat__meta">
          <span>{test}</span>
          <span>Seen 1.03PM</span>
        </div>
      </div>
      <Avatar isOnline="active" image={props.image} />
    </div>
  );

}

export default ChatItem
