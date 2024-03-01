import "./style.css";
import { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import ChatItem from "./item";
import { Box, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';
import { useEffect, useRef, useState } from 'react';

interface ChatContentProps {
  allMessages: Array<{ type: string; message: string }>;
  loadMoreMessages: () => void; // Assume loadMoreMessages returns a Promise
  hasMore: boolean; 
}

<<<<<<< HEAD
const ChatContent = ({ allMessages }: ChatContentProps):JSX.Element => {  

    return (
      <> 
        <Stack>
          <Box>
          {allMessages && allMessages.map((itm:any, index) => {
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
=======
const ChatContent = ({ allMessages, loadMoreMessages }: ChatContentProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      observer.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0].isIntersecting) {
            setIsLoading(true);
            await loadMoreMessages(); // Call the function to load more messages
            setIsLoading(false);
          }
        },
        { threshold: 1 }
      );
      
      observer.current.observe(messagesEndRef.current);
    }

    return () => {
      if (messagesEndRef.current && observer.current) {
        observer.current.unobserve(messagesEndRef.current);
      }
    };
  }, []);

  return (
    <>
      <Stack>
        <Box sx={{ flexDirection: 'column-reverse', display: 'flex' }}> {/* Add these styles */}
          {allMessages && allMessages.map((itm: any, index) => (
            <ChatItem
              key={itm.id || index} // Use message id as key, if it exists. Otherwise, use index.
              animationDelay={index + 2}
              user={itm.type ? itm.type : 'me'}
              msg={itm.message}
              image={itm.image}
            />
          ))}
        </Box>
      </Stack>
      <div ref={messagesEndRef} />
      {isLoading && <CircularProgress />} 
    </>
  );
>>>>>>> parent of ea30bfa (reversion)
}

export default ChatContent;