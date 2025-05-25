import React from 'react';
import { useSelector } from 'react-redux';
import { useGetHistoryByVolunteerQuery } from './historyApi';
import {
  Typography, CircularProgress, Box, Paper, List, ListItem, ListItemText, Divider
} from '@mui/material';

export default function History() {
  const user = useSelector((state) => state.auth.user);
  const { data: histories, isLoading, isError, error } = useGetHistoryByVolunteerQuery(user?._id, { skip: !user?._id });

  if (!user) return <Typography variant="h6" mt={5} textAlign="center">יש להתחבר כדי לראות את ההיסטוריה</Typography>;
  if (isLoading) return <Box mt={6} textAlign="center"><CircularProgress /></Box>;
  if (isError) return <Typography color="error" mt={5} textAlign="center">שגיאה: {error?.message}</Typography>;

  return (
    <Box p={3} sx={{ direction: "rtl" }}>
      <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
        היסטוריית ההתנדבויות שלי
      </Typography>
      {(!histories || histories.length === 0) ? (
        <Typography color="text.secondary">אין רשומות להצגה.</Typography>
      ) : (
        <List>
          {histories.map((record) => (
            <React.Fragment key={record._id}>
              <Paper sx={{ mb: 2, p: 2, borderRadius: 2, bgcolor: "#f3e5f5" }}>
                <ListItem alignItems="flex-start" disableGutters>
                  <ListItemText
                    primary={<Typography fontWeight={800} color="primary">{`קריאה: ${record.call?.category || '---'}`}</Typography>}
                    secondary={
                      <>
                        <Typography>תיאור: {record.call?.description || '---'}</Typography>
                        <Typography>תאריך: {new Date(record.timestamp).toLocaleString('he-IL')}</Typography>
                        <Typography>סטטוס: {record.status || '---'}</Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
}