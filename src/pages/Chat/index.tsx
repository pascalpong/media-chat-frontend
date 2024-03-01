import "./style.css";
import ChatContent from "./ChatContent/index";
import { Box, Grid } from "@mui/material";
import SendMessageTab from "./SendMessageTab";
import ChatHeader from "./ChatHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { socket } from "../../socket";
import { useCallChatMessagesMutation } from "../../services/chatRoomService";

interface MessageType {
  type: string;
  message: string;
  userId: string;
}

const Chat = (): JSX.Element => {
  const { roomId } = useParams();
  const [page, setPage] = useState(1);
  const storredUser = localStorage.getItem('user');
  const { _id: userId } = JSON.parse(`${storredUser}`)
  const [ allMessages, setAllMessages ] = useState<MessageType[]>([]);
  const [ callChatMessage ] = useCallChatMessagesMutation();
  const [ hasMore, setHasMore ] = useState(true);
  const initialRender = useRef(true); // this is to only run the effect on the first render. 

  const handleSendMessage = (message: string) => {
    socket.emit('message', { roomId, message, userId });
  };

  useEffect(() => {
    socket.emit('join', `${roomId}`);
  }, [roomId]);
  
  const handleIncomingMessage = (data: MessageType) => {
    if (data && data.userId) {
      setAllMessages((prevMessages) => {
        const { userId: senderId, message } = data;
        const addMessage = [{ type: userId === senderId ? '' : 'other', message, userId: senderId }, ...prevMessages];
        return addMessage
      });
    }
  };

  const loadMoreMessages = () => {
    setPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    socket.on('get-message', handleIncomingMessage);
    return () => {
      socket.off('get-message', handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false; // this is to only run the effect on the first render. 
    } else {
      if(page >= 1) {
        const messages = callChatMessage({ roomId: `${roomId}`, page: page.toString() }).unwrap();
        messages.then((response: any) => {
          if(response && response.length) {
            setAllMessages((prevMessages) => {
              const newMessages = arrangeMessage(response);
              return [...prevMessages, ...newMessages];
            });
          } else {
            setHasMore(false);
          }
        }); 
      }
    }
  }, [page]);

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
    <Box display="flex" flexDirection="column" height="100vh">
        <Box p={2} flexGrow={1}>
            <ChatHeader />
        </Box>
        <Box flexGrow={1}>
            <ChatContent allMessages={allMessages} loadMoreMessages={loadMoreMessages} hasMore={hasMore} />
        </Box>
        <Box p={2} flexGrow={1}>
            <SendMessageTab onSendMessage={handleSendMessage} />
        </Box>
    </Box>
  );
}

export default Chat;