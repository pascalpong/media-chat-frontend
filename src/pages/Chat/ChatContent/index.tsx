import "./style.css";
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

const ChatContent = ({ allMessages, loadMoreMessages, hasMore }: ChatContentProps):JSX.Element => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [allMessages]);

  const loadMore = async () => {
    if (!isLoading) {
      setIsLoading(true);
      await loadMoreMessages();
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack>
        <Box style={{ width: '100%' }}>
          <InfiniteScroll
            pageStart={1}
            loadMore={loadMore}
            hasMore={hasMore && !isLoading}
            isReverse={true}
            threshold={10}
            loader={<CircularProgress/>}
          >
          {allMessages && [...allMessages].reverse().map((itm:any, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={index}
                user={itm.type ? itm.type : "me" }
                msg={itm.message}
                image={itm.image}
              />
            );
          })}
          <div ref={messagesEndRef} />
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}

export default ChatContent;