import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../../styles/common_css/header.css';

const Header = () => {
  return (
    <AppBar style={{ position: 'fixed', top: 0, zIndex: 1000 }}>
      <Toolbar>
        <Typography variant="h6">My App</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
