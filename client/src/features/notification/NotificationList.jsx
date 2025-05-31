import React, { useState } from 'react';
import {
  useGetNotificationsQuery,
} from './notificationApi';
import {
  useUpdateStatusMutation
} from '../emergency/emergencyApi';
import {
  Paper, List, ListItem, ListItemText, Button,
  Typography, Box, Divider, CircularProgress, Select,
  MenuItem, InputLabel, FormControl, TextField, IconButton
} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

const statusColors = {
  open: "#ffa726",
  in_progress: "#42a5f5",
  closed: "#66bb6a",
};

const statusLabels = {
  open: "פתוח",
  in_progress: "בתהליך",
  closed: "סגור",
};

const Notification = () => {
  const { data: notifications = [], isLoading, isError, error } = useGetNotificationsQuery();
  const [updateStatus, { isLoading: isUpdating }] = useUpdateStatusMutation();

  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = async (call) => {
    if (!call) return;
    const nextStatus =
      call.status === 'open' ? 'in_progress' :
      call.status === 'in_progress' ? 'closed' :
      'open';
    try {
      await updateStatus({ id: call._id, status: nextStatus }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const statusMatches = !statusFilter || notification.call?.status === statusFilter;
    const searchMatches = !searchTerm ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.call?.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatches && searchMatches;
  });

  if (isLoading) return (
    <Box mt={6} textAlign="center">
      <CircularProgress />
    </Box>
  );

  if (isError) return (
    <Typography color="error" mt={4}>
      שגיאה: {error?.data?.message || error?.error}
    </Typography>
  );

  return (
    <Box sx={{
      direction: "rtl",
       background: 'linear-gradient(-45deg, #f0f4ff, #e1bee7, #ffccbc, #b2dfdb)',
      minHeight: "100vh",
      py: 7,
      display: "flex",
      justifyContent: "center"
    }}>
      <Paper elevation={6} sx={{
        p: 5,
        width: "100%",
        maxWidth: 720,
        borderRadius: 5,
        bgcolor: "#fff",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}>
        <Typography variant="h4" fontWeight={900} color="primary" gutterBottom>
          התראות אחרונות
        </Typography>

        {/* סינון וחיפוש */}
        {/* סינון, חיפוש, וניקוי */}
<Box display="flex" gap={2} mb={4} flexWrap="wrap" alignItems="center">
  <FormControl sx={{ minWidth: 140 }} size="small">
    <InputLabel>סנן לפי סטטוס</InputLabel>
    <Select
      value={statusFilter}
      label="סנן לפי סטטוס"
      onChange={(e) => setStatusFilter(e.target.value)}
    >
      <MenuItem value="">הצג הכול</MenuItem>
      <MenuItem value="open">פתוח</MenuItem>
      <MenuItem value="in_progress">בתהליך</MenuItem>
      <MenuItem value="closed">סגור</MenuItem>
    </Select>
  </FormControl>

  <TextField
    label="חיפוש חופשי"
    size="small"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    sx={{ flexGrow: 1 }}
  />

  {(statusFilter || searchTerm) && (
    <Button
      onClick={() => {
        setStatusFilter('');
        setSearchTerm('');
      }}
      variant="outlined"
      color="secondary"
      sx={{ whiteSpace: "nowrap" }}
    >
      נקה סינון
    </Button>
  )}
</Box>

{filteredNotifications.length === 0 ? (
  <Typography>אין התראות תואמות.</Typography>
) : (
  <List>
    {filteredNotifications.map((notification) => (
      <React.Fragment key={notification._id}>
        <Paper sx={{
          mb: 3,
          p: 3,
          borderRadius: 3,
          position: "relative",
          overflow: "hidden"
        }}>
          {/* פס צבע בצד ימין לפי סטטוס */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "6px",
              bgcolor: statusColors[notification.call?.status || "open"]
            }}
          />
          <ListItem alignItems="flex-start" disablePadding>
            <ListItemText
              primary={
                <Typography fontWeight="bold" color="primary" fontSize="1.1rem">
                  {notification.message}
                </Typography>
              }
              secondary={
                <Box mt={1}>
                  <Typography>תיאור: {notification.call?.description || "לא זמין"}</Typography>
                  <Typography>
                    מיקום: {notification.call?.location?.coordinates
                      ? `${notification.call.location.coordinates[1]}, ${notification.call.location.coordinates[0]}`
                      : 'לא זמין'}
                  </Typography>
                  <Typography>
                    תאריך: {new Date(notification.createdAt).toLocaleString("he-IL")}
                  </Typography>
                </Box>
              }
            />
            <Box display="flex" flexDirection="column" alignItems="center" ml={2}>
              {notification.call?.location?.coordinates && (
                <IconButton
                  href={`https://www.google.com/maps?q=${notification.call.location.coordinates[1]},${notification.call.location.coordinates[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                >
                  <RoomIcon />
                </IconButton>
              )}
              {notification.call && (
                <Button
                  variant="contained"
                  onClick={() => handleStatusChange(notification.call)}
                  sx={{
                    bgcolor: statusColors[notification.call.status],
                    color: "#fff",
                    mt: 1,
                    fontWeight: 700,
                    borderRadius: 3,
                    whiteSpace: "nowrap"
                  }}
                  disabled={isUpdating}
                >
                  {statusLabels[notification.call.status]}
                </Button>
              )}
            </Box>
          </ListItem>
        </Paper>
        <Divider />
      </React.Fragment>
    ))}
  </List>
)}

      </Paper>
    </Box>
  );
};

export default Notification;
