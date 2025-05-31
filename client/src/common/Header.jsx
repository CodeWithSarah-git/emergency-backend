import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const Header = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <AppBar position="fixed" color="default" sx={{
      bgcolor: "#ffffff",
      boxShadow: 3,
      direction: 'rtl',
      borderBottom: "4px solidrgb(210, 25, 111)"
    }}>
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
      <Typography
  variant="h5"
  component={Link}
  to="/"
  sx={{
    flexGrow: 1,
    fontWeight: 800,
    letterSpacing: 2,
    textDecoration: 'none',
    background: "linear-gradient(90deg, #7B61FF, #E943C3)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block"
  }}
>
  Lifeline360
</Typography>

        <Box>
          <Button component={Link} to="/" sx={navButtonStyle}>דף הבית</Button>
          {user?.role === 'admin' && (
            <Button component={Link} to="/users" sx={navButtonStyle}>משתמשים</Button>
          )}
          <Button component={Link} to="/notification" sx={navButtonStyle}>התראות</Button>
          <Button component={Link} to="/callHistory" sx={navButtonStyle}>היסטוריה</Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              ...navButtonStyle,
              fontWeight: 700,
              color: user ? "#d32f2f" : "#2e7d32"
            }}
          >
            {user ? "התנתק" : "התחברות"}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

const navButtonStyle = {
  color: "#1976d2",
  fontWeight: 600,
  mx: 0.5,
  transition: "0.3s",
  "&:hover": {
    bgcolor: "#e3f2fd"
  }
};

export default Header;
