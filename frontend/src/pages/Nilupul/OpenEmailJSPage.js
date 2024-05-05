import React from 'react';
import Button from '@mui/material/Button';

const OpenEmailJSPage = () => {
  const openEmailJSPage = () => {
    window.open('https://dashboard.emailjs.com/admin/account', '_blank');
  };

  return (
    <div>
      <h1>Welcome to My MERN Stack Web App</h1>
      <Button variant="contained" onClick={openEmailJSPage}>Open EmailJS Page</Button>
    </div>
  );
};

export default OpenEmailJSPage;
