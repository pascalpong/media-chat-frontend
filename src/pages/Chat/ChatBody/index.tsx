import "./style.css";
import ChatContent from "../ChatContent/index";
import { Box, Grid } from "@mui/material";
import SendMessageTab from "../SendMessageTab";
import ChatHeader from "../ChatHeader";

const ChatBody = ():JSX.Element => {
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
      <Grid item >
        <Box overflow={"auto"} >
          <ChatContent />
        </Box>
      </Grid>
      <Grid item >
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
