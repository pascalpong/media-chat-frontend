import { Button, Container } from "@mui/material";
import { useGetUsersQuery } from "../../services/userService";
import { useEffect, useState } from "react";



const ChatList = ():JSX.Element => {
    const { data: users } = useGetUsersQuery('');
    const [ getUsers, setGetUsers ] = useState([])
    useEffect(() => {
        if(users) {
            setGetUsers(users)
        }
    },[users])
    return (
        <>
            <Container>
            {getUsers.map((user: any) => 
                <Button 
                    key={user._id} 
                    variant="outlined"
                    href={`chat/${user._id}`}
                >
                    { user.username }
                </Button>
            )}
            </Container>
        </>
    )
}

export default ChatList;