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
}

const ChatBody = (): JSX.Element => {
  const { roomId } = useParams();
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const { data: getMessages } = useGetChatMessagesQuery(`${roomId}`);

  const handleSendMessage = (message: string) => {
    socket.emit('message', { roomId, message });
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { type: "me", message },
    ]);
  };

  useEffect(() => {
    socket.emit('join', `${roomId}`);
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    const handleIncomingMessage = (data: MessageType) => {
      setAllMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.on('message', handleIncomingMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket.off('message', handleIncomingMessage);
    };
  }, [roomId]);

  useEffect(() => {
    setAllMessages(getMessages);
  }, [getMessages]);

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
          {/* Add your ChatHeader component here */}
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