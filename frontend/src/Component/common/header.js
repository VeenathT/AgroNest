import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/common_css/header.css';
import { Box } from '@mui/system';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar style={{ position: 'fixed', top: 0, zIndex: 1000 }} sx={{ backgroundColor: '#0f5132' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" component={Link} to="/" color="inherit" className="site-name">
          AgroNest
        </Typography>
        <Box>
          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/profiletype">Profile</Button>
              <Button color="inherit" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/logintype">Login</Button>
              <Button color="inherit" component={Link} to="/signuptype">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
