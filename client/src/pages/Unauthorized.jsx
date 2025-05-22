// pages/Unauthorized.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Unauthorized() {
  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" color="error">
        אין לך הרשאה לצפות בדף זה
      </Typography>
    </Box>
  );
}