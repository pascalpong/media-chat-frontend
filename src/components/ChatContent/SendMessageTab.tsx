import { Box, Button, FormControl, Grid, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { useSendMessageMutation } from "../../services/messageService";


const SendMessageTab = ():JSX.Element => {

    let chatItms: any[] = []
    const [chatItems, setChatItems] = useState({
      chat: chatItms,
      msg: ""
    });

    const [submitMessage] = useSendMessageMutation()

    const onStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChatItems({ ...chatItems, msg: e.target.value });
      };
    
      const sendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const messageValue = chatItems.msg;
        const result = await submitMessage({
          roomId: "65af5e399d2cdf02ccaf6add",
          body: {
            userId: "65ae189006b5af2c2afe5079",
            message: messageValue
          }
        }).unwrap();
    
        console.log(result)
        
        setChatItems({ chat: [...chatItems.chat], msg: "" });
      }
    
    return (
        <Box sx={{ width: '100%' }}>
            <FormControl fullWidth>
                <Grid container spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                        size="small"
                        type="text"
                        placeholder="Type a message here"
                        fullWidth
                        onChange={onStateChange}
                        value={chatItems.msg}
                        variant="outlined"
                        color="primary"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={sendMessage}>
                            <SendIcon />
                        </Button>
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    )
}

export default SendMessageTab