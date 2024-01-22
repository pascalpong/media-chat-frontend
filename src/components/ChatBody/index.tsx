import React, { Component } from "react";
import "./style.css";
import ChatList from "../ChatList";
import ChatContent from "../ChatContent";
import UserProfile from "../Profile";

const ChatBody = (params:any) => {

  return (
    <div className="main__chatbody">
      <ChatList />
      <ChatContent />
      <UserProfile />
    </div>
  );
}

export default ChatBody;
