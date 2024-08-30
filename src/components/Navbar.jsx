import React from 'react';
import { AppBar, Typography } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        backdropFilter: 'blur(6px)', 
        width: '80%',
        margin: 'auto',
        borderRadius: '15px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Typography variant="h4" sx={{ color: '#134B70', fontWeight: 'bold' }}>
        User Management
      </Typography>
    </AppBar>
  );
};

export default Navbar;
