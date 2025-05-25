import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Fade } from '@mui/material';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', phone: '', password: '',
    email: '', address: '', role: '', adminCode: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignup
        ? 'http://localhost:5000/api/auth/register'
        : 'http://localhost:5000/api/auth/login';

      const payload = isSignup ? formData : {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post(url, payload);
      const { accessToken, user } = res.data;

      if (accessToken && user) {
        localStorage.setItem('token', accessToken);
        dispatch(setCredentials({ token: accessToken, user }));
        setMessage('התחברת בהצלחה!');
        setTimeout(() => {
          if (user.role === 'admin') {
            navigate('/AdminDashboard');
          } else {
            navigate('/DashBoard');
          }
        }, 1000);
      } else {
        setMessage('הרשמה בוצעה, אבל לא הצלחנו להתחבר אוטומטית');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'שגיאה בהתחברות');
    }
  };

  return (
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #f8fafc 0%, #e1bee7 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 5,
      }}
    >
      <Fade in>
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 5,
            width: '100%',
            maxWidth: 400,
            textAlign: 'center',
            bgcolor: '#fff',
            boxShadow: '0 8px 32px rgba(0,0,0,0.11)',
          }}
        >
          <Typography variant="h4" color="primary" fontWeight={900} gutterBottom>
            {isSignup ? 'הרשמה' : 'התחברות'}
          </Typography>

          <Box component="form" mt={3} onSubmit={handleSubmit} autoComplete="off">
            {isSignup && (
              <>
                <TextField
                  label="שם פרטי"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="שם משפחה"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="טלפון"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <TextField
                  label="כתובת"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  required
                />
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>תפקיד</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="תפקיד"
                  >
                    <MenuItem value=""><em>בחר תפקיד</em></MenuItem>
                    <MenuItem value="volunteer">מתנדב</MenuItem>
                    <MenuItem value="admin">מנהל</MenuItem>
                  </Select>
                </FormControl>
                {formData.role === 'admin' && (
                  <TextField
                    label="קוד מנהל"
                    name="adminCode"
                    type="password"
                    value={formData.adminCode}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                )}
              </>
            )}
            <TextField
              type="email"
              label="מייל"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              type="password"
              label="סיסמה"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color={isSignup ? "primary" : "error"}
              fullWidth
              sx={{ py: 1.5, fontWeight: 700, mt: 3, mb: 1, borderRadius: 2, fontSize: '1.1rem' }}
            >
              {isSignup ? 'הרשם' : 'התחבר'}
            </Button>
          </Box>

          <Typography sx={{ mt: 2, color: message === 'התחברת בהצלחה!' ? 'green' : 'red', minHeight: 32 }}>
            {message}
          </Typography>

          <Button
            onClick={() => setIsSignup(!isSignup)}
            color="primary"
            variant="text"
            sx={{ mt: 2, fontWeight: 600, fontSize: '1rem' }}
          >
            {isSignup ? 'יש לך חשבון? התחבר' : 'אין לך חשבון? הירשם'}
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
}