import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Paper, Stack, Fade, useTheme
} from '@mui/material';
import { SupportAgent } from '@mui/icons-material';

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    setRole(localStorage.getItem('role'));
  }, []);

  return (
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        px: 2, py: 6,
        background: 'linear-gradient(-45deg, #f0f4ff, #e1bee7, #ffccbc, #b2dfdb)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 15s ease infinite',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Fade in>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            maxWidth: 460,
            width: "100%",
            borderRadius: 5,
            textAlign: "center",
            bgcolor: "white",
            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
            border: "1px solid #e3e3e3"
          }}
        >
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{
              background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              textShadow: '0 1px 1px rgba(0,0,0,0.1)'
            }}
          >
            <SupportAgent sx={{ fontSize: 40, verticalAlign: 'middle', ml: 1 }} />
            ברוך הבא
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" fontWeight={600} mb={4}>
            נהל פניות, התראות ומשתמשים – הכל במקום אחד
          </Typography>

          <Stack spacing={2}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.6, fontSize: '1.05rem', fontWeight: 700, borderRadius: 2,
                background: 'linear-gradient(90deg, #2196f3, #1976d2)',
                '&:hover': { background: 'linear-gradient(90deg, #1976d2, #0d47a1)' }
              }}
              onClick={() => navigate('/emergency')}
            >
              יצירת קריאת חירום חדשה
            </Button>

            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.6, fontSize: '1.05rem', fontWeight: 700, borderRadius: 2,
                background: 'linear-gradient(90deg, #4fc3f7, #0288d1)',
                '&:hover': { background: 'linear-gradient(90deg, #039be5, #01579b)' }
              }}
              onClick={() => navigate('/notification')}
            >
              צפייה בהתראות
            </Button>

            {role === 'admin' && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ py: 1.4, fontWeight: 700, borderRadius: 2 }}
                onClick={() => navigate('/users')}
              >
                ניהול משתמשים
              </Button>
            )}

            {role && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ py: 1.4, fontWeight: 700, borderRadius: 2 }}
                onClick={() => navigate('/callHistory')}
              >
                היסטוריית פניות שלי
              </Button>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.6, fontSize: '1.05rem', fontWeight: 700, borderRadius: 2,
                background: 'linear-gradient(90deg, #ef5350, #d32f2f)',
                '&:hover': { background: 'linear-gradient(90deg, #e53935, #b71c1c)' }
              }}
              onClick={() => {
                localStorage.removeItem('role');
                navigate('/');
              }}
            >
              התנתק
            </Button>
          </Stack>
        </Paper>
      </Fade>
    </Box>
  );
}
