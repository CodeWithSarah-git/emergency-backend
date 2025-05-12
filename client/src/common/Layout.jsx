
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            מערכת קריאות חירום
          </Typography>
          <Button color="inherit" component={Link} to="/users">משתמשים</Button>
          <Button color="inherit" component={Link} to="/notification">התראות</Button>
          <Button color="inherit" component={Link} to="/emergency">קריאות חירום</Button>
          <Button color="inherit" component={Link} to="/callHistory">היסטוריית טיפול</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
