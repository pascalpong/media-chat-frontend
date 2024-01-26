import React from "react";
import "./style.css";
import { Box, Button, Grid } from "@mui/material";

const UserProfile = () => {
  const toggleInfo = (e: React.MouseEvent<HTMLDivElement>) => {
    const cardHeader = e.currentTarget as HTMLDivElement;
    const card = cardHeader.parentNode as HTMLDivElement;
    card.classList.toggle("open");
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined">Outlined</Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined">Outlined</Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined">Outlined</Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="outlined">Outlined</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
