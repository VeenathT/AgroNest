import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const InquiryCategory = () => {
  return (
    <Box bgcolor="white" p={3}>
      <Typography variant="h4" align="center" gutterBottom>
        Select Category
      </Typography>
      <Box display="flex" justifyContent="center">
        <Link to="/formPage?category=Farmer" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
            Farmer
          </Button>
        </Link>
        <Link to="/formPage?category=Dealer" style={{ textDecoration: 'none' }}>
          <Button variant="contained" color="primary">
            Dealer
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default InquiryCategory;
