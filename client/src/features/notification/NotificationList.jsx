import React from 'react';
import { useGetNotificationsQuery } from './notificationApi';
import { useUpdateStatusMutation } from '../emergency/emergencyApi';
import { Paper, List, ListItem, ListItemText, Button, Typography, Box, Divider, CircularProgress } from '@mui/material';

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

  const handleStatusChange = async (call) => {
    if (!call) return;
    const nextStatus =
      call.status === 'open' ? 'in_progress' :
      call.status === 'in_progress' ? 'closed' :
      'open';
    try {
      await updateStatus({ id: call._id, status: nextStatus }).unwrap();
    } catch (err) {
      // אפשר לטפל בשגיאה
    }
  };

  if (isLoading) return <Box mt={6} textAlign="center"><CircularProgress /></Box>;
  if (isError) return <Typography color="error" mt={4}>שגיאה: {error?.data?.message || error?.error}</Typography>;

  return (
    <Box sx={{ p: 3, direction: "rtl" }}>
      <Typography variant="h4" fontWeight={700} color="primary" mb={2}>
        התראות אחרונות
      </Typography>
      <List>
        {notifications.length === 0 ? (
          <Typography>אין התראות להצגה.</Typography>
        ) : notifications.map((notification) => (
          <React.Fragment key={notification._id}>
            <Paper sx={{ mb: 2, p: 2, bgcolor: "#e3f2fd", borderRadius: 2 }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={
                    <Typography fontWeight="bold" color="primary">
                      {notification.message}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography>תיאור: {notification.call?.description || "לא זמין"}</Typography>
                      <Typography>
                        מיקום: {notification.call?.location?.coordinates
                          ? `${notification.call.location.coordinates[1]}, ${notification.call.location.coordinates[0]}`
                          : 'לא זמין'}
                      </Typography>
                      <Typography>
                        תאריך: {new Date(notification.createdAt).toLocaleString("he-IL")}
                      </Typography>
                    </>
                  }
                />
                {notification.call && (
                  <Button
                    variant="contained"
                    onClick={() => handleStatusChange(notification.call)}
                    sx={{
                      bgcolor: statusColors[notification.call.status],
                      color: "#fff",
                      minWidth: 85,
                      ml: 2,
                      fontWeight: 700
                    }}
                    disabled={isUpdating}
                  >
                    {statusLabels[notification.call.status]}
                  </Button>
                )}
              </ListItem>
            </Paper>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Notification;