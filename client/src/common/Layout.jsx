import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/users">משתמשים</Button>
          <Button color="inherit" component={Link} to="/notification">התראות</Button>
          <Button color="inherit" component={Link} to="/emergency">קריאות</Button>
          <Button color="inherit" component={Link} to="/callHistory">היסטוריה</Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Layout;
