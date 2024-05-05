import React from 'react';
import Button from '@mui/material/Button';

const GmailButton = () => {
  const openGmail = () => {
    window.open('https://mail.google.com/mail/u/3/#inbox', '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '500px' }}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={openGmail}
        style={{ width: '200px', height: '80px', fontSize: '1.5rem' }}
      >
        Open Gmail
      </Button>
    </div>
  );
};

export default GmailButton;
