import { Drawer, IconButton } from "@mui/material";
import Avatar from "../ChatList/Avatar";
import Profile from "../Profile/index";
import Fingerprint from '@mui/icons-material/Fingerprint';
import { useState } from "react";


const ChatHeader = ():JSX.Element => {

    const [ open, setOpen ] = useState(false)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <>
            <div className="content__header">
                <div className="blocks">
                    <div className="current-chatting-user">
                    <Avatar
                        isOnline="active"
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
                    />
                    <p>Tim Hover</p>
                    </div>
                </div>
                <IconButton 
                    aria-label="fingerprint" 
                    color="secondary"
                    onClick={toggleDrawer(true)}
                >
                    <Fingerprint />
                </IconButton>
            </div>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={toggleDrawer(false)}
            >
                <Profile />
            </Drawer>
        </>
    )

}

export default ChatHeader;