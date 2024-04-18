import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@mui/material';

const InquiryRow = ({ inquiry }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
      <Typography variant="body1">Topic: {inquiry.topic}</Typography>
      <Link to={`/viewInquiry/${inquiry._id}`}>
      </Link>
    </div>
  );
}

export default InquiryRow;
