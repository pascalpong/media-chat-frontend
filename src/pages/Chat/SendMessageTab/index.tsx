import { Box, Button, FormControl, Grid, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useSendMessageMutation } from "../../../services/messageService";
import { socket } from "../../../socket";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";


const SendMessageTab = ():JSX.Element => {
  const { roomId } = useParams();
  const { _id: userId, name, socialMedia } = JSON.parse(`${localStorage.getItem('user')}`);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      message: ""
    }
  });
  const [ message, setMessage ] = useState('')

  console.log(userId,'userIduserId',roomId,'roomIdroomId')

  useEffect(() => {
    socket.emit('message', { roomId, message} );
    socket.on('get-message', (data) => {
      console.log(data)
    });

  },[message]);

  const onSubmit = async (values: {message: string}) => {
    setMessage(message)
  }

  
    
    return (
        <Box sx={{ width: '100%' }}>
          <FormControl component={'form'} fullWidth>
            <Grid container spacing={2}>
              <Grid item xs={10}>
                <TextField
                  size="small"
                  type="text"
                  placeholder="Type a message here"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  {...register('message')}
                />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={handleSubmit(onSubmit)}>
                  <SendIcon />
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Box>
    )
}

export default SendMessageTab