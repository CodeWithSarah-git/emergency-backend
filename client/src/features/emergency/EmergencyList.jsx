import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText, Typography, Box, Paper,} from '@mui/material';
import { useAddEmergencyMutation } from './emergencyApi';

export default function EmergencyForm() {
  const [form, setForm] = useState({ title: '', description: '', urgency: 'medium' });
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [firstAidInstructions, setFirstAidInstructions] = useState('');
  const [addEmergency, { isLoading }] = useAddEmergencyMutation();

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
        pos => {
          setLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        err => alert('שגיאה באיתור מיקום: ' + err.message)
      );
    } else {
      alert('הדפדפן לא תומך ב-GPS');
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === 'title') {
      setFirstAidInstructions(firstAidGuide[value]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!location) return alert('חובה לקבל מיקום לפני שליחה');

    try {
      await addEmergency({
        title: form.title,
        description: form.description,
        location,
        urgency: form.urgency,
        status: 'open',
      }).unwrap();

      setMessage('הפנייה נשלחה בהצלחה!');
      setForm({ title: '', description: '', urgency: 'medium' });
      setFirstAidInstructions('');
    } catch (err) {
      console.error(err);
      setMessage('שגיאה בשליחה');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="100vh" bgcolor="#f5f5f5" py={5}>
      <Paper elevation={3} sx={{ p: 4, width: '90%', maxWidth: 500, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom color="error">
          יצירת קריאת חירום
        </Typography>

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>סוג פגיעה</InputLabel>
            <Select name="title" value={form.title} onChange={handleChange} label="סוג פגיעה">
              <MenuItem value="bleeding">דימום</MenuItem>
              <MenuItem value="burn">כווייה</MenuItem>
              <MenuItem value="fracture">שבר</MenuItem>
              <MenuItem value="headInjury">פגיעת ראש</MenuItem>
              <MenuItem value="abdominalInjury">פגיעת בטן</MenuItem>
              <MenuItem value="fainting">פרכוסים</MenuItem>
              <MenuItem value="seizures">עוויתות</MenuItem>
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

          <FormControl fullWidth margin="normal">
            <InputLabel>דחיפות</InputLabel>
            <Select name="urgency" value={form.urgency} onChange={handleChange} label="דחיפות">
              <MenuItem value="low">נמוך</MenuItem>
              <MenuItem value="medium">בינוני</MenuItem>
              <MenuItem value="high">גבוה</MenuItem>
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
            {isLoading ? 'שולח...' : 'שלח פנייה'}
          </Button>
        </form>

        {firstAidInstructions && (
          <Paper sx={{ padding: 2, marginTop: 3, backgroundColor: '#fff3cd', border: '1px solid #ffecb5' }}>
            <Typography variant="h6" sx={{ color: '#cc6600', fontWeight: 'bold' }}>
              הוראות לעזרה ראשונה:
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap', fontWeight: 'bold' }}>
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
