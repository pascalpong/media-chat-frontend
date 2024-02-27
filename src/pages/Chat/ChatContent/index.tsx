import "./style.css";
import ChatItem from "./item";
import { Box, Stack } from "@mui/material";
import InfiniteScroll from 'react-infinite-scroll-component';

interface ChatContentProps {
  allMessages: Array<{ type: string; message: string }>;
  loadMoreMessages: () => void;
}

const ChatContent = ({ allMessages, loadMoreMessages }: ChatContentProps):JSX.Element => { 
  
  const fetchMoreData = () => {
    loadMoreMessages()
  };

  return (
    <>
      <Stack>
        <Box>
          <InfiniteScroll
            dataLength={allMessages.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
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
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
}

export default ChatContent;