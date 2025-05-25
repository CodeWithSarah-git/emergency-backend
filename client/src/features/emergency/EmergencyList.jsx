import React, { useState, useEffect } from 'react';
import {
  Button, TextField, MenuItem, Select, InputLabel, FormControl,
  FormHelperText, Typography, Box, Paper, CircularProgress,
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
    <Box display="flex" justifyContent="center" alignItems="start" minHeight="100vh" bgcolor="#f8fafc" py={7} sx={{ direction: "rtl" }}>
      <Paper elevation={6} sx={{ p: 5, width: "100%", maxWidth: 520, borderRadius: 4, bgcolor: "#fff" }}>
        <Typography variant="h4" color="error" fontWeight={800} gutterBottom>
          פנייה חדשה
        </Typography>
        <Typography mb={2} color="text.secondary" fontWeight={600}>
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

          <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'שלח פנייה'}
          </Button>
        </form>

        {firstAidInstructions && (
          <Paper sx={{ padding: 2, marginTop: 3, backgroundColor: '#fffbe7', border: '1px solid #ffe082', borderRadius: 2 }}>
            <Typography variant="h6" color="#ad8500" fontWeight="bold">
              הוראות לעזרה ראשונה:
            </Typography>
            <Typography sx={{ whiteSpace: "pre-wrap", fontWeight: "bold" }}>
              {firstAidInstructions}
            </Typography>
          </Paper>
        )}

        {message && (
          <Typography
            variant="h6"
            sx={{
              marginTop: 3,
              color: message === 'הפנייה נשלחה בהצלחה!' ? 'green' : 'red',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {message}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}