import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '', lastname: '', phone: '', password: '',
    email: '', address: '', role: '',
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
      console.log('res.data', res.data);

      const { accessToken, user } = res.data;

      // ✅ שורת השמירה ב-localStorage
      localStorage.setItem('token', accessToken);

      console.log('TOKEN:', accessToken);

      dispatch(setCredentials({ token: accessToken, user }));
      setMessage('התחברת בהצלחה!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'שגיאה בהתחברות');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>{isSignup ? 'הרשמה' : 'התחברות'}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input name="firstname" placeholder="שם פרטי" onChange={handleChange} required />
            <input name="lastname" placeholder="שם משפחה" onChange={handleChange} required />
            <input name="phone" placeholder="טלפון" onChange={handleChange} required />
            <input name="address" placeholder="כתובת" onChange={handleChange} required />
            <select name="role" onChange={handleChange} required>
              <option value="">בחר תפקיד</option>
              <option value="volunteer">מתנדב</option>
              <option value="admin">מנהל</option>
            </select>
          </>
        )}
        <input type="email" name="email" placeholder="מייל" onChange={handleChange} required />
        <input type="password" name="password" placeholder="סיסמה" onChange={handleChange} required />
        <button type="submit">{isSignup ? 'הרשם' : 'התחבר'}</button>
      </form>
      <p style={{ marginTop: 10 }}>{message}</p>
      <button onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? 'יש לך חשבון? התחבר' : 'אין לך חשבון? הירשם'}
      </button>
    </div>
  );
}
