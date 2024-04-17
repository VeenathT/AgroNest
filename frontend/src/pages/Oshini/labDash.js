import React from 'react';
import { Link } from 'react-router-dom';
import { IconButton, styled } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon properly

// Custom styled IconButton to adjust size
const LargeIconButton = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(10), // Adjust width as needed
  height: theme.spacing(10), // Adjust height as needed
}));

const LabDash = () => {
  return (
    <div>
      {/* Navigation button for lab profile */}
      <Link to="/labProfile" style={{ position: 'fixed', top: '70px', right: '20px', textDecoration: 'none' }}>
        <LargeIconButton>
          <AccountCircleIcon /> {/* Use the imported icon component */}
        </LargeIconButton>
      </Link>
    </div>
  );
};

export default LabDash;



