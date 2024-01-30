import "./style.css";
import ChatContent from "../ChatContent/index";
import { Box, Grid, Stack } from "@mui/material";
import SendMessageTab from "../SendMessageTab";
import ChatHeader from "../ChatHeader";
import { useEffect } from "react";
import { socket } from "../../../socket";

const ChatBody = (params:any) => {

  const { _id: userId, name, socialMedia } = JSON.parse(`${localStorage.getItem('user')}`);

  useEffect(() => {
    socket.on(`${userId}`, async (data:any) => {
        console.log(data)
    });
  },[socket])

  return (
    <Grid 
      container 
      direction="column" 
      height="100vh"
    >
      <Grid 
        item
        xs={12}
      >
        <Box 
          position={"fixed"} 
          top={0} 
          p={2} 
          width={"100vw"}
        >
          <ChatHeader />
        </Box>
      </Grid>
      <Grid 
        item
        xs={12}
        flexGrow={1}
      >
        <Box
        >
          <Box
            overflow={"auto"} 
          >
            <ChatContent 
              sx={{ 
                height: "100%" 
              }} 
            />
          </Box>
        </Box>
      </Grid>
      <Grid  
        item
        xs={12}
      >
        <Box 
          position={"fixed"} 
          bottom={0} 
          p={2} 
          width={"100vw"}
        >
          <SendMessageTab />
        </Box>
      </Grid>
    </Grid>
  );
}

export default ChatBody;
