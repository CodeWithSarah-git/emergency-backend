import React, { useState } from 'react';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from './userApi';
import {
  Box, TextField, Button, Typography, Paper,
  IconButton, CircularProgress, useTheme, Grid
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { PersonAdd, ManageAccounts } from '@mui/icons-material';

export default function UserList() {
  const theme = useTheme();
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
    location: null, // חדש!
  });

  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  const handleChange = (e) => setNewUser({ ...newUser, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditedUser({ ...editedUser, [e.target.name]: e.target.value });

  // מיקום אוטומטי עבור משתמש חדש
  const getCurrentLocationForNewUser = () => {
    setLocationStatus(''); // איפוס הודעה
    if (!navigator.geolocation) {
      setLocationStatus("הדפדפן לא תומך ב-GPS");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      pos => {
        setNewUser(prev => ({
          ...prev,
          location: {
            type: "Point",
            coordinates: [pos.coords.longitude, pos.coords.latitude]
          }
        }));
        setLocationStatus('מיקום נקלט בהצלחה!');
      },
      err => {
        setLocationStatus("שגיאה באיתור מיקום: " + err.message);
      }
    );
  };

  const handleAddUser = async () => {
    const { firstname, lastname, email, phone, password, role, location } = newUser;
    if (!firstname || !lastname || !email || !phone || !password || !role) return;

    // אפשר לדרוש מיקום חובה, או להשאיר אופציונלי
    // if (!location) {
    //   alert("יש לבחור מיקום אוטומטי מהדפדפן!");
    //   return;
    // }

    try {
      await addUser({ ...newUser, location }).unwrap();

      setNewUser({
        firstname: '', lastname: '', email: '',
        phone: '', address: '', password: '', role: 'volunteer', location: null
      });
      setLocationStatus('');
      refetch();
    } catch (err) {
      console.error("שגיאה בהוספת משתמש:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (err) {}
  };

  const handleSaveEdit = async () => {
    try {
      let updatedData = { ...editedUser };

      // אם שינו כתובת, אפשר להציע לעדכן מיקום חדש
      // (אפשר להוסיף כאן קבלת מיקום מהדפדפן אם רוצים)
      // כרגע - לא נוגע במיקום בעת עריכה
      await updateUser({ id: editingUserId, ...updatedData }).unwrap();
      setEditingUserId(null);
      refetch();
    } catch (err) {}
  };

  const filteredUsers = users.filter((user) =>
    (`${user.firstname} ${user.lastname}`.toLowerCase().includes(searchName.toLowerCase()) &&
      (user.address || '').toLowerCase().includes(searchAddress.toLowerCase())
    )
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
    <Box
      sx={{
        direction: 'rtl',
        minHeight: '100vh',
        px: 2,
        py: 6,
        background: 'linear-gradient(-45deg, #f0f4ff, #e1bee7, #ffccbc, #b2dfdb)',
        backgroundSize: '400% 400%',
        animation: 'gradientMove 15s ease infinite',
      }}
    >
      <Paper elevation={4} sx={{ p: 4, mb: 4, borderRadius: 5, maxWidth: 1000, mx: 'auto', textAlign: 'center' }}>
        <Typography variant="h3" fontWeight={900} color="primary" gutterBottom>
          <ManageAccounts sx={{ fontSize: 40, verticalAlign: 'middle', ml: 1 }} />
          ניהול משתמשים
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontWeight={600} mb={3}>
          הוספה, עריכה ומחיקה של משתמשים במערכת
        </Typography>

        {/* טופס הוספה */}
        <Grid container spacing={2} justifyContent="center" mb={3}>
          {["firstname", "lastname", "email", "phone", "address", "password", "role"].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              <TextField
                fullWidth
                label={
                  field === "password"
                    ? "סיסמה"
                    : field === "role"
                    ? "תפקיד"
                    : field
                }
                name={field}
                value={newUser[field]}
                type={field === "password" ? "password" : "text"}
                onChange={handleChange}
                size="small"
              />
            </Grid>
          ))}
          {/* כפתור מיקום אוטומטי */}
          <Grid item xs={12} sm={6} md={4}>
            <Button
              fullWidth
              variant="outlined"
              onClick={getCurrentLocationForNewUser}
              sx={{ borderRadius: 3, py: 1.2, fontWeight: 700, mb: 1 }}
            >
              בחר מיקום אוטומטי מהדפדפן
            </Button>
            {locationStatus && (
              <Typography color={locationStatus.includes('בהצלחה') ? "success.main" : "error"} fontWeight={700} mt={1}>
                {locationStatus}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={handleAddUser}
              sx={{ borderRadius: 3, py: 1.2, fontWeight: 700, mt: 2 }}
            >
              הוסף משתמש
            </Button>
          </Grid>
        </Grid>

        {/* חיפוש */}
        <Box mb={4}>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            חיפוש משתמשים
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="חיפוש לפי שם"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="חיפוש לפי כתובת"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        {/* רשימת משתמשים */}
        <Box>
          <Typography variant="h6" fontWeight={700} gutterBottom>
            רשימת משתמשים
          </Typography>
          {filteredUsers.length === 0 ? (
            <Typography color="text.secondary">אין משתמשים להצגה</Typography>
          ) : (
            filteredUsers.map((user) => (
              <Paper
                key={user._id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: 3,
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                {editingUserId === user._id ? (
                  <>
                    {["firstname", "lastname", "email", "phone", "address"].map((field) => (
                      <TextField
                        key={field}
                        name={field}
                        value={editedUser[field]}
                        onChange={handleEditChange}
                        label={field}
                        size="small"
                        sx={{ mx: 1 }}
                      />
                    ))}
                    <Button variant="contained" onClick={handleSaveEdit}>שמור</Button>
                    <Button variant="outlined" onClick={() => setEditingUserId(null)}>ביטול</Button>
                  </>
                ) : (
                  <>
                    <Typography sx={{ flex: 1 }}>
                      {user.firstname} {user.lastname} | {user.email} | {user.phone} | {user.address}
                    </Typography>
                    <Button
                      onClick={() => {
                        setEditingUserId(user._id);
                        setEditedUser({ ...user });
                      }}
                    >
                      ערוך
                    </Button>
                    <IconButton color="error" onClick={() => handleDelete(user._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </Paper>
            ))
          )}
        </Box>
      </Paper>
    </Box>
  );
}