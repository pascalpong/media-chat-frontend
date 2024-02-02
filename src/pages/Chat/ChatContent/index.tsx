import React, { useState, useEffect, useRef } from "react";

import "./style.css";
import ChatItem from "./item";
import { useGetChatMessagesQuery } from "../../../services/chatRoomService";
import { Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { socket } from "../../../socket";

interface ChatContentProps {
  allMessages: Array<{ type: string; message: string }>;
}

const ChatContent = ({ allMessages }: ChatContentProps):JSX.Element => {

  const { roomId } = useParams();

  useEffect(() => {
    socket.on('get-message', (data) => {
      console.log(data);
    });
  },[]);

    return (
      <>
        <Stack>
          {JSON.stringify(allMessages)}
          <Box>
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
          </Box>
        </Stack>
      </>
    );
}

export default ChatContent;