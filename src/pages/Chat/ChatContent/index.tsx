import "./style.css";
import { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';
import ChatItem from "./item";

interface ChatContentProps {
  allMessages: Array<{ type: string; message: string }>;
  loadMoreMessages: () => Promise<void>; // Add a prop for the function to load more messages
}

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
}

export default ChatContent;