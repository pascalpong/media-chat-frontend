import React, { Component } from "react";
import "./style.css";
import ChatList from "../ChatList";
import ChatContent from "../ChatContent";
import UserProfile from "../Profile";
import { Container, Grid } from "@mui/material";

const ChatBody = (params:any) => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <ChatContent />
      </Grid>
      <Grid item xs={4}>
        <UserProfile />
      </Grid>
    </Grid>
  );
}

export default ChatBody;
