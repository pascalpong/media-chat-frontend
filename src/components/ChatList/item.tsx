import React from "react";
import Avatar from "./Avatar";

const ChatListItems = (props: any) => {

  const handleChatSelect = (e: React.MouseEvent<HTMLInputElement>) => {
    const parentNode = e.currentTarget.parentNode;
    if (parentNode) {
      for (let index = 0; index < parentNode.children.length; index++) {
        parentNode.children[index].classList.remove("active");
      }
      e.currentTarget.classList.add("active");
    }
  };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={handleChatSelect}
      className={`chatlist__item ${props.active ? "active" : ""}`}
    >
      <Avatar
        image={props.image || "http://placehold.it/80x80"}
        isOnline={props.isOnline}
      />

      <div className="userMeta">
        <p>{props.name}</p>
        <span className="activeTime">32 mins ago</span>
      </div>
    </div>
  );
}

export default ChatListItems;
