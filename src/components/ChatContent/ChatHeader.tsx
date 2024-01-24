import Avatar from "../ChatList/Avatar";


const ChatHeader = ():JSX.Element => {

    return (
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

            <div className="blocks">
                <div className="settings">
                <button className="btn-nobg">
                    <i className="fa fa-cog"></i>
                </button>
                </div>
            </div>
        </div>
    )

}

export default ChatHeader;