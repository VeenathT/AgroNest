import React from 'react';
import { Container, Paper, Typography } from '@mui/material';

const Footer = ({ visible }) => {
  return (
    <Paper 
      square 
      elevation={3} 
      style={{
        backgroundColor: '#f8f9fa', 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body1" align="center" style={{ padding: '20px 0' }}>
          &copy; 2024 My App. All rights reserved.
        </Typography>
      </Container>
    </Paper>
  );
};

export default Footer;
