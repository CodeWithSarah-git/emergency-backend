import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Box, Typography, Button, Paper,Grid} from '@mui/material';
//import Grid from '@mui/material/Unstable_Grid2';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';

export default function HomePage() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToEmergencyForm = () => {
    navigate('/emergency');
  };

  const stats = [
    {
      icon: <DirectionsCarIcon sx={{ fontSize: 50 }} color="error" />,
      number: '24%',
      label: "מקרי החירום הם תאונות דרכים"
    },
    {
      icon: <TwoWheelerIcon sx={{ fontSize: 50 }} color="primary" />,
      number: '1,200',
      label: 'מתנדבים פעילים ברחבי הארץ'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 50 }} color="secondary" />,
      number: '95%',
      label: 'מהמקרים מקבלים מענה בתוך דקות'
    },
    {
      icon: <VolunteerActivismIcon sx={{ fontSize: 50 }} color="success" />,
      number: '8,212',
      label: 'מתנדבים רשומים בפלטפורמה'
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 50 }} color="warning" />,
      number: '2,000+',
      label: 'קריאות חירום ביום'
    },
    {
      icon: <ElectricalServicesIcon sx={{ fontSize: 50 }} color="info" />,
      number: '5,000+',
      label: 'מיקומים עם ציוד עזרה ראשונה נגיש'
    }
  ];

  return (
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        py: 6,
        px: 2,
        background: 'linear-gradient(270deg, #ff6f61, #ff4081, #7c4dff)',
        backgroundSize: '600% 600%',
        animation: 'gradientAnimation 15s ease infinite',
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center" mb={6}>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: 500,
            width: '90%',
            textAlign: 'center',
            borderRadius: 3,
            bgcolor: 'white',
          }}
        >
          <Typography variant="h4" color="error" gutterBottom>
            ברוכים הבאים ל־ResQNow
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            בחרו את הפעולה הרצויה:
          </Typography>

          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ mt: 2, mb: 2, py: 1.5, fontSize: '1rem' }}
            onClick={goToLogin}
          >
            התחבר כמתנדב / מנהל
          </Button>

          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#C2185B',
              '&:hover': { backgroundColor: '#AD1457' },
              py: 1.5,
              fontSize: '1rem',
            }}
            onClick={goToEmergencyForm}
          >
            קריאת חירום - עזרה ראשונה מיידית
          </Button>
        </Paper>
      </Box>

      <Box textAlign="center" px={3} color="white">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          בכל שנייה – אפשר להציל חיים
        </Typography>
        <Typography variant="h6" gutterBottom>
          ResQNow מאפשר לך להזעיק עזרה מיידית<br />
          ולקבל הנחיות עזרה ראשונה מצילות חיים – עוד לפני שהאמבולנס מגיע.
        </Typography>
        <Typography variant="body1" mt={2}>
          המתנדבים שלנו פרוסים בכל הארץ, מוכנים לסייע בכל רגע.
          <br />
          הצטרפו למשימה והיו חלק מהמערכת שמחברת בין אנשים בצרה – לבין אלה שמסוגלים לעזור.
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={4}>
  {stats.map((item, index) => (
    <Grid xs={12} sm={4} md={2} key={index}>
      <Box textAlign="center">
        {item.icon}
        <Typography variant="h6" fontWeight="bold" mt={1}>
          {item.number}
        </Typography>
        <Typography variant="body2">{item.label}</Typography>
      </Box>
    </Grid>
  ))}
</Grid>
      </Box>
    </Box>
  );
}