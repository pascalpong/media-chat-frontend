import "./style.css";
import ChatItem from "./item";
import { Box, Stack } from "@mui/material";

interface ChatContentProps {
  allMessages: Array<{ type: string; message: string }>;
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