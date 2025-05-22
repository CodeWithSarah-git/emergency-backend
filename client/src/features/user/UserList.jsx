import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} from './userApi';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserList() {
  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'volunteer',
  });

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    const { firstname, lastname, email, phone, password, role } = newUser;
    if (!firstname || !lastname || !email || !phone || !password || !role) return;
    try {
      await addUser(newUser).unwrap();
      setNewUser({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        role: 'volunteer',
      });
    } catch (err) {
      // אפשר להציג הודעת שגיאה למשתמש
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      // אפשר להציג הודעת שגיאה למשתמש
    }
  };

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Typography color="error" mt={3}>
        שגיאה בטעינת משתמשים: {error?.data?.message || error?.error || 'Unknown error'}
      </Typography>
    );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        משתמשים
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          הוסף משתמש חדש
        </Typography>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField label="שם פרטי" name="firstname" value={newUser.firstname} onChange={handleChange} />
          <TextField label="שם משפחה" name="lastname" value={newUser.lastname} onChange={handleChange} />
          <TextField label="אימייל" name="email" value={newUser.email} onChange={handleChange} />
          <TextField label="טלפון" name="phone" value={newUser.phone} onChange={handleChange} />
          <TextField label="כתובת" name="address" value={newUser.address} onChange={handleChange} />
          <TextField label="סיסמה" name="password" type="password" value={newUser.password} onChange={handleChange} />
          <TextField label="תפקיד" name="role" value={newUser.role} onChange={handleChange} />
          <Button variant="contained" onClick={handleAddUser}>
            הוסף
          </Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          רשימת משתמשים
        </Typography>
        {users.length === 0 ? (
          <Typography>אין משתמשים להצגה</Typography>
        ) : (
          users.map((user) => (
            <Box
              key={user._id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom="1px solid #ccc"
              py={1}
            >
              <Typography>
                {user.firstname} {user.lastname} | {user.email} | {user.phone}
              </Typography>
              <IconButton color="error" onClick={() => handleDelete(user._id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
}