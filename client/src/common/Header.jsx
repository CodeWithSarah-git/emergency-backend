import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const Header = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <AppBar position="fixed" color="primary" sx={{ boxShadow: 3, direction: 'rtl' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h5" component={Link} to="/" sx={{
          flexGrow: 1,
          fontWeight: 800,
          letterSpacing: 2,
          textDecoration: 'none',
          color: "inherit",
        }}>
          Lifeline360
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            דף הבית
          </Button>
          {user?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/users">
              משתמשים
            </Button>
          )}
          <Button color="inherit" component={Link} to="/notification">
            התראות
          </Button>
          <Button color="inherit" component={Link} to="/callHistory">
            היסטוריה
          </Button>
          <Button color="inherit" component={Link} to="/login">
            {user ? "התנתק" : "התחברות"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;