import React, { useState, useRef, useCallback, useEffect } from 'react';
import "./style.css";
import ChatContent from "../ChatContent/index";
import { Box, Grid } from "@mui/material";
import SendMessageTab from "../SendMessageTab";
import ChatHeader from "../ChatHeader";
import { useParams } from "react-router-dom";
import { socket } from "../../../socket";
import { useGetChatMessagesQuery } from "../../../services/chatRoomService";

interface MessageType {
  type: string;
  message: string;
  userId: string;
}

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  }
}

const ChatBody = (): JSX.Element => {
  const { roomId } = useParams();
  const storredUser = localStorage.getItem('user');
  const { _id: userId } = JSON.parse(`${storredUser}`)
  const [allMessages, setAllMessages] = useState<MessageType[]>([]);
  const [queryFilters, setQueryFilters] = useState({
    page: 1,
    roomId: roomId
  });
  const loader = useRef(null);

  const { data: chatMessagesData, refetch } = useGetChatMessagesQuery({ roomId: `${roomId}`, page: queryFilters.page });

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const LoadMoreMessages = async () => {
    if (!hasMore) {
      return;
    }
  
    setIsLoading(true);
    setQueryFilters((prev) => {
      return { ...prev, page: prev.page + 1 };
    });
  
    const newMessages = (await refetch()).data; // Access the 'data' property of 'newMessages'
    if (newMessages.length === 0) {
      setHasMore(false);
    } else {
      setAllMessages(prevMessages => [...prevMessages, ...arrangeMessage(newMessages)]);
    }
    setIsLoading(false);
  };

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && hasMore) {  
      LoadMoreMessages();
    }
  }, [isLoading, hasMore]);

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };
    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [handleObserver]);

  useEffect(() => {
    if(chatMessagesData) {
      setAllMessages(prevMessages => [...prevMessages, ...arrangeMessage(chatMessagesData)]);
    }
  }, [chatMessagesData]);

  const debouncedSendMessage = useRef(debounce((message: string) => {
    socket.emit('message', { roomId, message, userId });
  }, 300));

  const handleSendMessage = (message: string) => {
    debouncedSendMessage.current(message);
  };

  useEffect(() => {
    if (!roomId) {
      return;
    }
    socket.emit('join', `${roomId}`);
    
    const getMessage = (data: MessageType) => {
      if (data && data.userId) {
        setAllMessages((prevMessages) => {
          const { userId: senderId, message } = data;
          const addMessage = [...prevMessages, { type: userId === senderId ? '' : 'other', message, userId: senderId }];
          return addMessage;
        });
      }
    };
    
    socket.on('get-message', getMessage);
    return () => {
      socket.off('get-message', getMessage);
    };
  }, [roomId]);

  const arrangeMessage = (messageSet: MessageType[]) => { 
    if (!messageSet) {
      return [];
    }
  
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
      <ChatContent allMessages={allMessages} loadMoreMessages={LoadMoreMessages} />
      <div ref={loader} /> 
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