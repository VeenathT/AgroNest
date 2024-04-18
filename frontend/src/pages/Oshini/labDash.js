import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, styled, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Import the icon properly

// Custom styled IconButton to adjust size
const LargeIconButton = styled(IconButton)(({ theme }) => ({
  width: theme.spacing(6), // Adjust width as needed
  height: theme.spacing(6), // Adjust height as needed
}));

const LargeAccountCircleIcon = styled(AccountCircleIcon)({
  fontSize: '3.5rem', // Adjust icon size as needed
  color: 'white', // Set icon color to white
});

const LabDash = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Fetch userName from session
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div>
      {/* Navigation button for lab profile */}
      <div style={{ position: 'fixed', top: '80px', right: '30px', display: 'flex', alignItems: 'center' }}>
        <Typography variant="body1" style={{ marginRight: '10px', color: 'white'}}>
          Hello {userName}
        </Typography>
        <Link to="/labProfile" style={{ textDecoration: 'none' }}>
          <LargeIconButton>
            <LargeAccountCircleIcon /> {/* Use the custom styled icon component */}
          </LargeIconButton>
        </Link>
      </div>
    </div>
  );
};

export default LabDash;
