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
}

export default ChatContent;