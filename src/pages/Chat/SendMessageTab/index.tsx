import { Box, Button, FormControl, Grid, TextField } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import { useSendMessageMutation } from "../../../services/messageService";
import { socket } from "../../../socket";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

interface SendMessageTabProps {
  onSendMessage: (message: string) => void;
}

const SendMessageTab = ({ onSendMessage }: SendMessageTabProps):JSX.Element => {
  const { roomId } = useParams();
  const { _id: userId, name, socialMedia } = JSON.parse(`${localStorage.getItem('user')}`);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      message: ""
    }
  });
  const [ message, setMessage ] = useState('');
  const [ sendMessage ] = useSendMessageMutation();
  const onSubmit = async (values: {message: string}) => {
    try {
      setMessage(values.message);
      onSendMessage(values.message);
      await sendMessage({roomId, body: {
        userId, message: values.message
      }})
      socket.emit('message', { roomId, message} );
      reset();
    } catch (error) {
      console.log(error)
    }
  }
    return (
        <Box 
          component={'form'} 
          sx={{ 
            width: '100%' 
          }}
        >
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
        </Box>
    )
}

export default SendMessageTab