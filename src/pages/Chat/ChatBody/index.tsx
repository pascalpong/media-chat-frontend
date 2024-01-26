import "./style.css";
import ChatContent from "../ChatContent/index";
import { Box, Grid, Stack } from "@mui/material";
import SendMessageTab from "../SendMessageTab";
import ChatHeader from "../ChatHeader";

const ChatBody = (params:any) => {

  return (
    <Grid 
      container 
      direction="column" 
      height="100vh"
    >
      <Grid item>
        <Box 
          position={"fixed"} 
          top={0} 
          p={2} 
          width={"100vw"}
        >
          <ChatHeader />
        </Box>
      </Grid>
      <Grid item xs flexGrow={1}>
        <Box
          height={"90vh"}
          overflow={"auto"} 
        >
          <ChatContent 
            sx={{ 
              height: "100%" 
            }} 
          />
        </Box>
      </Grid>
      <Grid item>
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
