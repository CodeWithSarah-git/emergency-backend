import React, { useState, useEffect } from 'react';
import {
  Button, TextField, MenuItem, Select, InputLabel, FormControl,
  FormHelperText, Typography, Box, Paper, CircularProgress
} from '@mui/material';
import { useAddEmergencyMutation } from './emergencyApi';
import { useAddNotificationMutation } from '../notification/notificationApi';

export default function EmergencyForm() {
  const [form, setForm] = useState({ category: '', description: '', urgency: 'medium' });
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [firstAidInstructions, setFirstAidInstructions] = useState('');
  const [addEmergency, { isLoading }] = useAddEmergencyMutation();
  const [addNotification] = useAddNotificationMutation();

  const firstAidGuide = {
    bleeding: '1. לחץ על המקום הפגוע עם בד נקי.\n2. שמור על הלחץ עד להגעת עזרה מקצועית.',
    burn: '1. שטוף את המקום עם מים קרים למשך לפחות 10 דקות.\n2. הנח קומפרסים קרים על המקום הפגוע.',
    fracture: '1. אל תזיז את המקום הפגוע.\n2. נסה לקבע את האזור הפגוע בעזרת חומרים זמינים עד להגעת עזרה מקצועית.',
    headInjury: '1. אל תזיז את הפצוע.\n2. אם הפצוע מאבד את ההכרה, הפוך אותו בזהירות על הצד.\n3. במקרה של דימום מהראש, לחץ בעדינות על המקום הפגוע.',
    abdominalInjury: '1. אל תזיז את הפצוע.\n2. במידה ויש דימום, לחץ בעדינות על המקום הפגוע.\n3. שמור על שקט ואל תתן לפצוע לאכול או לשתות.',
    fainting: '1. שכב את הפצוע על הגב והרים את הרגליים.\n2. אם הפצוע לא מתעורר אחרי כמה דקות, יש לקרוא לעזרה רפואית מיד.',
    seizures: '1. נסו למנוע מהפצוע להיפגע במהלך ההתפרצות.\n2. אם התסמינים לא חולפים לאחר 5 דקות, יש להזמין עזרה רפואית.',
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => setMessage('שגיאה באיתור מיקום: ' + err.message)
      );
    } else {
      setMessage('הדפדפן לא תומך ב-GPS');
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'category') {
      setFirstAidInstructions(firstAidGuide[value] || '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location) {
      setMessage('מיקום לא זמין, אנא אפשר גישה ל-GPS');
      return;
    }
    try {
      const result = await addEmergency({
        category: form.category,
        description: form.description,
        urgency: form.urgency,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat],
        },
      }).unwrap();

      const newEmergency = result.call;
      await addNotification({
        call: newEmergency._id,
        message: `התראת חירום חדשה: ${newEmergency.category} - ${newEmergency.description}`,
      });

      setMessage('הפנייה נשלחה בהצלחה!');
      setForm({ category: '', description: '', urgency: 'medium' });
      setFirstAidInstructions('');
    } catch (err) {
      setMessage('שגיאה בשליחה');
    }
  };

  return (
    <Box
      sx={{
        direction: "rtl",
        minHeight: "100vh",
        px: 2,
        py: 6,
        background: 'linear-gradient(-45deg, #f0f4ff, #e1bee7, #ffccbc, #b2dfdb)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 15s ease infinite',
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: 5,
          maxWidth: 550,
          mx: "auto",
          borderRadius: 5,
          textAlign: "center",
          bgcolor: "#fff",
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)"
        }}
      >
        <Typography variant="h3" fontWeight={900} color="error" gutterBottom>
          פנייה חדשה
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" fontWeight={600} mb={3}>
          מלא את הפרטים ושלח קריאה דחופה. אנא אפשר גישה למיקום.
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>סוג פגיעה</InputLabel>
            <Select name="category" value={form.category} onChange={handleChange} label="סוג פגיעה">
              <MenuItem value="bleeding">דימום</MenuItem>
              <MenuItem value="burn">כווייה</MenuItem>
              <MenuItem value="fracture">שבר</MenuItem>
              <MenuItem value="headInjury">פגיעת ראש</MenuItem>
              <MenuItem value="abdominalInjury">פגיעת בטן</MenuItem>
              <MenuItem value="fainting">עילפון</MenuItem>
              <MenuItem value="seizures">פרכוסים</MenuItem>
            </Select>
            <FormHelperText>בחר את סוג הפציעה</FormHelperText>
          </FormControl>

          <TextField
            name="description"
            label="תיאור"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>דחיפות</InputLabel>
            <Select name="urgency" value={form.urgency} onChange={handleChange} label="דחיפות">
              <MenuItem value="low">נמוכה</MenuItem>
              <MenuItem value="medium">בינונית</MenuItem>
              <MenuItem value="high">גבוהה</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="error"
            fullWidth
            sx={{
              py: 1.5,
              fontWeight: 700,
              mt: 3,
              mb: 1,
              borderRadius: 2,
              fontSize: '1.1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'שלח פנייה'}
          </Button>
        </form>

        <Typography
          sx={{
            mt: 2,
            minHeight: 32,
            color: message === 'הפנייה נשלחה בהצלחה!' ? 'green' : 'red',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {message}
        </Typography>

        {firstAidInstructions && (
          <Paper sx={{
            p: 2,
            mt: 3,
            backgroundColor: '#fff8e1',
            border: '1px solid #ffe082',
            borderRadius: 3,
          }}>
            <Typography variant="h6" color="#ad8500" fontWeight="bold" gutterBottom>
              הוראות לעזרה ראשונה:
            </Typography>
            <Typography sx={{ whiteSpace: "pre-wrap", fontWeight: 600 }}>
              {firstAidInstructions}
            </Typography>
          </Paper>
        )}
      </Paper>

      {/* אנימציית רקע */}
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </Box>
  );
}
