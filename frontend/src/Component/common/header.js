import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/common_css/header.css';
import { Box } from '@mui/system';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar style={{ position: 'fixed', top: 0, zIndex: 1000 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">My App</Typography>
        <Box>
        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
