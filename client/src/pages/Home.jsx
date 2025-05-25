import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Grid, Avatar } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SecurityIcon from '@mui/icons-material/Security';

const stats = [
  { icon: <BoltIcon fontSize="large" color="warning" />, number: '6,700+', label: "פניות טופלו החודש", bg: "#fff3e0" },
  { icon: <PeopleAltIcon fontSize="large" color="primary" />, number: '1,850', label: 'מתנדבים זמינים עכשיו', bg: "#e3f2fd" },
  { icon: <SupportAgentIcon fontSize="large" color="secondary" />, number: '98%', label: 'מענה ראשוני עד 3 דק\'', bg: "#f3e5f5" },
  { icon: <LocalHospitalIcon fontSize="large" color="error" />, number: '3,930', label: 'מוקדים רפואיים מחוברים', bg: "#ffebee" },
  { icon: <EmojiEmotionsIcon fontSize="large" color="success" />, number: '9.7', label: 'דירוג שביעות רצון', bg: "#e8f5e9" },
  { icon: <SecurityIcon fontSize="large" color="info" />, number: '24/7', label: 'מערכת מאובטחת וזמינה', bg: "#e0f7fa" }
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e1bee7 100%)',
        pt: 8, pb: 5, px: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 5,
          borderRadius: 6,
          width: '95%',
          maxWidth: 530,
          textAlign: 'center',
          bgcolor: 'white',
          mb: 5,
          mt: { xs: 4, md: 2 },
        }}
      >
        <Typography variant="h2" color="primary" fontWeight={900} gutterBottom sx={{ letterSpacing: 1 }}>
          Lifeline360
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontWeight={600} mb={3}>
          מערכת החירום המתקדמת בישראל – זמינות, מהירות וקהילה מחבקת
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.7, fontSize: '1.1rem', mb: 2, fontWeight: 700, borderRadius: 2, letterSpacing: 1.5 }}
          onClick={() => navigate('/login')}
        >
          כניסת מתנדבים/מנהלים
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{
            py: 1.7, fontSize: '1.1rem', fontWeight: 700, borderRadius: 2, letterSpacing: 1.5,
            background: 'linear-gradient(90deg, #ff7043 0%, #d32f2f 100%)',
            '&:hover': { background: 'linear-gradient(90deg, #d84315 0%, #b71c1c 100%)' }
          }}
          onClick={() => navigate('/emergency')}
        >
          קריאת חירום מיידית
        </Button>
      </Paper>

      <Box textAlign="center" mb={3}>
        <Typography variant="h4" fontWeight={800} mb={1} color="primary">
          יחד – מצילים חיים בלחיצת כפתור
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={2}>
          Lifeline360 מחברת בין פונים לעזרה <b>לבין מתנדבים מנוסים</b> בפריסה ארצית, בליווי מקצועי ובתחושת שליחות.
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" maxWidth="lg">
        {stats.map((item, idx) => (
          <Grid item xs={12} sm={6} md={2} key={idx}>
            <Box>
              <Avatar
                sx={{
                  bgcolor: item.bg,
                  width: 70, height: 70, margin: "0 auto", mb: 1.2, boxShadow: 2
                }}
              >
                {item.icon}
              </Avatar>
              <Typography variant="h6" fontWeight={800} color="primary.dark" mt={1}>
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