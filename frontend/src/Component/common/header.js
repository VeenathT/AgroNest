import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../styles/common_css/header.css';
import { Box } from '@mui/system';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar style={{ position: 'fixed', top: 30, zIndex: 1000 }} sx={{ backgroundColor: '#0f5132' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" component={Link} to="/" color="inherit" className="site-name">
          AgroNest
        </Typography>
        <Box>
        <Button color="inherit" component={Link} to="/inquiryCategory">Help</Button>
          <Button color="inherit" component={Link} to="/soiltest">Soil Test</Button>
          <Button color="inherit" component={Link} to="/Itemlist">Shop</Button>
          {isLoggedIn ? (
            <>
              <Button variant="contained" color="success" sx={{ marginRight: 1 }} component={Link} to="/profiletype">Profile</Button>
              <Button variant="contained" color="error" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Button variant="contained" color="success" sx={{ marginRight: 1 }} component={Link} to="/logintype">Login</Button>
              <Button variant="contained" color="success" component={Link} to="/signuptype">Sign Up</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
