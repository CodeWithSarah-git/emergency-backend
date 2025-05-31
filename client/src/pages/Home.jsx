import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Paper, Grid, Avatar, useTheme
} from '@mui/material';
import {
  Bolt, PeopleAlt, SupportAgent, LocalHospital,
  EmojiEmotions, Security
} from '@mui/icons-material';

const stats = [
  { icon: <Bolt />, number: '6,700+', label: "פניות טופלו החודש", bg: "#fff3e0" },
  { icon: <PeopleAlt />, number: '1,850', label: 'מתנדבים זמינים עכשיו', bg: "#e3f2fd" },
  { icon: <SupportAgent />, number: '98%', label: "מענה ראשוני עד 3 דק'", bg: "#f3e5f5" },
  { icon: <LocalHospital />, number: '3,930', label: 'מוקדים רפואיים מחוברים', bg: "#ffebee" },
  { icon: <EmojiEmotions />, number: '9.7', label: 'דירוג שביעות רצון', bg: "#e8f5e9" },
  { icon: <Security />, number: '24/7', label: 'מערכת מאובטחת וזמינה', bg: "#e0f7fa" }
];

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTheme();

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
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* לוגו עם אייקון */}
      <Typography
        variant="h2"
        fontWeight={900}
        sx={{
          background: 'linear-gradient(90deg, #7c4dff, #ff4081)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign: 'center',
          mb: 2,
          letterSpacing: 2,
          textShadow: '0 1px 1px rgba(0,0,0,0.1)'
        }}
      >
        <SupportAgent sx={{ fontSize: 40, verticalAlign: 'middle', ml: 1 }} />
        Lifeline360
      </Typography>

      {/* תיאור */}
      <Typography
        variant="subtitle1"
        color="text.secondary"
        fontWeight={600}
        mb={4}
        textAlign="center"
      >
        מערכת החירום המתקדמת בישראל – זמינות, מהירות וקהילה מחבקת
      </Typography>

      {/* כפתורים */}
      <Paper
        elevation={4}
        sx={{
          p: 4, borderRadius: 5, width: '95%', maxWidth: 520,
          mb: 5, backgroundColor: 'white', textAlign: 'center'
        }}
      >
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            py: 1.6, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, mb: 2,
            '&:hover': { backgroundColor: theme.palette.primary.dark }
          }}
          onClick={() => navigate('/login')}
        >
          כניסת מתנדבים/מנהלים
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.6, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2,
            background: 'linear-gradient(90deg, #ff7043, #d32f2f)',
            '&:hover': { background: 'linear-gradient(90deg, #e64a19, #b71c1c)' }
          }}
          onClick={() => navigate('/emergency')}
        >
          קריאת חירום מיידית
        </Button>
      </Paper>

      {/* טקסט נוסף */}
      <Typography variant="h4" fontWeight={800} mb={1} color="primary">
        יחד – מצילים חיים בלחיצת כפתור
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        mb={4}
        textAlign="center"
      >
        Lifeline360 מחברת בין פונים לעזרה <b>לבין מתנדבים מנוסים</b> בפריסה ארצית, בליווי מקצועי ובתחושת שליחות.
      </Typography>

      {/* כרטיסי סטטיסטיקה */}
      <Grid container spacing={2} justifyContent="center" maxWidth="lg">
        {stats.map((item, idx) => (
          <Grid item xs={6} sm={4} md={2} key={idx}>
            <Box textAlign="center">
              <Avatar
                sx={{
                  bgcolor: item.bg,
                  width: 70,
                  height: 70,
                  margin: "0 auto",
                  mb: 1.2,
                  boxShadow: 2,
                  transition: 'transform 0.3s ease, background-color 0.3s ease, color 0.3s ease',
                  cursor: 'pointer',
                  color: 'inherit',
                  '&:hover': {
                    transform: 'scale(1.2)',
                    bgcolor: 'primary.main',
                    color: '#fff',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                  }
                }}
              >
                {item.icon}
              </Avatar>
              <Typography
                variant="h6"
                fontWeight={800}
                color="primary.dark"
                sx={{
                  transition: 'transform 0.3s',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              >
                {item.number}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                {item.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
