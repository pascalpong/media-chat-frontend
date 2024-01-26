import React, { Component } from "react";

const Avatar = ({image, isOnline}: {image: string, isOnline: string}) => {
  
  return (
    <div className="avatar">
      <div className="avatar-img">
        <img src={image} alt="#" />
      </div>
      <span className={`isOnline ${isOnline}`}></span>
    </div>
  );
}

export default Avatar