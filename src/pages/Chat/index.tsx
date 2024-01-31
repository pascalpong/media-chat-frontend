import { useParams } from "react-router-dom";
import ChatBody from "./ChatBody";
import { useEffect } from "react";
import { socket } from "../../socket";


const Chat = ():JSX.Element => {
    const { roomId } = useParams();
    useEffect(() => {
        socket.emit('join', `${roomId}`);
    },[]);

    return (
        <>
            <ChatBody />
        </>
    )
}

export default Chat;