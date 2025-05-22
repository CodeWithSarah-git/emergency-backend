import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice'; // ודא שהנתיב נכון

const Header = () => {
  const user = useSelector(selectCurrentUser);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          מערכת חירום
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/Home">
            דף הבית
          </Button>

          {/* מוצג רק למנהל */}
          {user?.role === 'admin' && (
            <Button color="inherit" component={Link} to="/users">
              משתמשים
            </Button>
          )}

          <Button color="inherit" component={Link} to="/notification">
            התראות
          </Button>
          <Button color="inherit" component={Link} to="/emergency">
            קריאות
          </Button>
          <Button color="inherit" component={Link} to="/callHistory">
            היסטוריה
          </Button>
          <Button color="inherit" component={Link} to="/login">
            התחברות
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
