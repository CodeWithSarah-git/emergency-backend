import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './userApi';
import { Box, TextField, Button, Typography, Paper, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function UserList() {
  const { data: users = [], isLoading, isError, error, refetch } = useGetUsersQuery();
  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [newUser, setNewUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    role: 'volunteer',
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');

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
      refetch();
    } catch (err) {
      // טיפול בשגיאה
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (err) {
      // טיפול בשגיאה
    }
  };

  const handleEditChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await updateUser({ id: editingUserId, ...editedUser }).unwrap();
      setEditingUserId(null);
      refetch();
    } catch (err) {
      // טיפול בשגיאה
    }
  };

  const filteredUsers = users.filter((user) =>
    (`${user.firstname} ${user.lastname}`.toLowerCase().includes(searchName.toLowerCase()) &&
      user.address.toLowerCase().includes(searchAddress.toLowerCase()))
  );

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" mt={3}>
        שגיאה בטעינת משתמשים: {error?.data?.message || error?.error || 'שגיאה לא ידועה'}
      </Typography>
    );
  }

  return (
    <Box p={3} sx={{ direction: "rtl" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom color="primary">
        ניהול משתמשים
      </Typography>

      <Paper elevation={3} sx={{ p: 2, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
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
          <Button variant="contained" onClick={handleAddUser}>הוסף</Button>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          חיפוש
        </Typography>
        <Box display="flex" gap={2}>
          <TextField label="חפש לפי שם" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
          <TextField label="חפש לפי כתובת" value={searchAddress} onChange={(e) => setSearchAddress(e.target.value)} />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          רשימת משתמשים
        </Typography>
        {filteredUsers.length === 0 ? (
          <Typography>אין משתמשים להצגה</Typography>
        ) : (
          filteredUsers.map((user) => (
            <Box
              key={user._id}
              display="flex"
              gap={2}
              flexWrap="wrap"
              alignItems="center"
              borderBottom="1px solid #eee"
              py={1}
            >
              {editingUserId === user._id ? (
                <>
                  <TextField name="firstname" value={editedUser.firstname} onChange={handleEditChange} label="שם פרטי" />
                  <TextField name="lastname" value={editedUser.lastname} onChange={handleEditChange} label="שם משפחה" />
                  <TextField name="email" value={editedUser.email} onChange={handleEditChange} label="אימייל" />
                  <TextField name="phone" value={editedUser.phone} onChange={handleEditChange} label="טלפון" />
                  <TextField name="address" value={editedUser.address} onChange={handleEditChange} label="כתובת" />
                  <Button variant="contained" onClick={handleSaveEdit}>שמור</Button>
                  <Button variant="outlined" onClick={() => setEditingUserId(null)}>ביטול</Button>
                </>
              ) : (
                <>
                  <Typography sx={{ flex: 1 }}>
                    {user.firstname} {user.lastname} | {user.email} | {user.phone} | {user.address}
                  </Typography>
                  <Button onClick={() => {
                    setEditingUserId(user._id);
                    setEditedUser({
                      firstname: user.firstname,
                      lastname: user.lastname,
                      email: user.email,
                      phone: user.phone,
                      address: user.address,
                    });
                  }}>
                    ערוך
                  </Button>
                  <IconButton color="error" onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
}