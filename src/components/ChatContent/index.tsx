import React, { useState, useEffect, useRef } from "react";

import "./style.css";
import ChatItem from "./item";
import ChatList from "../ChatList";
import { useGetChatMessagesQuery } from "../../services/chatRoomService";
import { Box } from "@mui/material";
import SendMessageTab from "./SendMessageTab";
import ChatHeader from "./ChatHeader";


const ChatContent = (props: any):JSX.Element => {

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: chatMessages, isLoading, error } = useGetChatMessagesQuery("65af5e399d2cdf02ccaf6add");
  // const messages =

  const [allMessages, setAllMessages] = useState([])


  useEffect(() => {
    if(chatMessages) {
      chatMessages.map((message: any, key: number) => {
        return {
          key,
          type: "other" && "",
          msg: message.message
        }
      })
      setAllMessages(chatMessages)
    }

  },[chatMessages])

    return (
      <div className="main__chatcontent">
        <ChatHeader/>
        <Box>
          <div className="chat__items content__body">
            {allMessages.map((itm:any, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={index}
                  user={itm.type ? itm.type : "me"}
                  msg={itm.message}
                  image={itm.image}
                />
              );
            })} 
          </div>
          <SendMessageTab />
        </Box>
      </div>
    );
}

export default ChatContent;