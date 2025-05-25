import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Paper, Stack, Fade } from '@mui/material';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #a9d5fa 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Fade in>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            maxWidth: 430,
            width: "100%",
            borderRadius: 4,
            textAlign: "center",
            bgcolor: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            border: "1px solid #e3e3e3"
          }}
        >
          <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
            ברוך הבא למערכת החירום
          </Typography>
          <Typography variant="subtitle1" color="#64748b" mb={3}>
            כאן תוכל לנהל קריאות, התראות, משתמשים ועוד
          </Typography>
          <Stack spacing={2} mt={3}>
            <Button variant="contained" color="primary" fullWidth onClick={() => navigate('/emergency')}>
              יצירת קריאת חירום חדשה
            </Button>
            <Button variant="contained" color="info" fullWidth onClick={() => navigate('/notification')}>
              צפייה בהתראות
            </Button>
            {role === 'admin' && (
              <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/users')}>
                ניהול משתמשים
              </Button>
            )}
            {role && (
              <Button variant="outlined" color="secondary" fullWidth onClick={() => navigate('/callHistory')}>
                היסטוריית פניות שלי
              </Button>
            )}
            <Button variant="contained" color="error" fullWidth onClick={() => {
              localStorage.removeItem('role');
              navigate('/');
            }}>
              התנתק
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  );
}