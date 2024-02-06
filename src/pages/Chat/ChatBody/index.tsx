import "./style.css";
import ChatContent from "../ChatContent/index";
import { Box, Grid } from "@mui/material";
import SendMessageTab from "../SendMessageTab";
import ChatHeader from "../ChatHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useGetChatMessagesQuery } from "../../../services/chatRoomService";

interface MessageType {
  type: string;
  message: string;
  userId: string;
}

const ChatBody = (): JSX.Element => {
  const { roomId } = useParams();
  const storredUser = localStorage.getItem('user');
  const { _id: userId } = JSON.parse(`${storredUser}`)
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const { data: getMessages } = useGetChatMessagesQuery(`${roomId}`);

  const handleSendMessage = (message: string) => {
    socket.emit('message', { roomId, message, userId });
  };

  useEffect(() => {
    socket.emit('join', `${roomId}`);
  }, [roomId]);
  
  const handleIncomingMessage = (data: MessageType) => {
    if (data) {
      setAllMessages((prevMessages) => {
        const { userId: senderId, message } = data;
        const addMessage = [...prevMessages, { type: userId === senderId ? '' : 'other', message, userId: senderId }];
        return addMessage
      });
    }
  };

  useEffect(() => {
    socket.on('get-message', handleIncomingMessage);
    return () => {
      socket.off('get-message', handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    if(getMessages) {
      setAllMessages(arrangeMessage(getMessages));
    }
  }, [getMessages]);

  const arrangeMessage = (messageSet: MessageType[]) => { 
    return messageSet.map((data: any) => {
      return {
        message: data.message,
        type: userId === data.userId ? '' : 'other',
        userId: data.userId
      }
    })
  }

  return (
    <Grid
      container 
      direction="row" 
      height="100vh"
    >
      <Grid item >
        <Box 
          position={"fixed"} 
          top={0} 
          p={2} 
          width={"100vw"}
        >
          <ChatHeader />
        </Box>
      </Grid>
      <Grid item >
        <Box overflow={"auto"} >
          <ChatContent allMessages={allMessages} />
        </Box>
      </Grid>
      <Grid item >
        <Box 
          position={"fixed"} 
          bottom={0} 
          p={2} 
          width={"100vw"}
        >
          <SendMessageTab onSendMessage={handleSendMessage} />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatBody;