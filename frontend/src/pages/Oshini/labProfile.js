import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StyledContainer = styled(Container)({
  marginTop: '50px',
});

const Label = styled(Typography)({
  display: 'block',
  marginBottom: '10px',
  fontWeight: 'bold',
});

const ValueLabel = styled(Typography)({
  display: 'block',
  marginBottom: '20px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
});

const LabProfile = () => {
  const [labDetails, setLabDetails] = useState({});
  const navigate = useNavigate(); 

  // Function to fetch lab details based on the userName from session
  const fetchLabDetails = async () => {
    try {
      const userName = sessionStorage.getItem('userName');
      const response = await axios.get(`http://localhost:8070/labAccount/retrieve?userName=${userName}`);
      setLabDetails(response.data);
    } catch (error) {
      console.error('Error fetching lab details:', error);
    }
  };

  useEffect(() => {
    fetchLabDetails();
  }, []);

  // Function to handle navigation to labEdit
  const handleEdit = async (e) => {
    navigate('/labEdit'); // Navigate to labEdit route
  };

  return (
    <StyledContainer maxWidth="md">
      <Paper style={{ padding: '20px', backgroundColor: 'rgba(255, 255, 255, 0.9)', width: '55%', position: 'fixed', left: '20%', right : '40%'}}>
        <Typography variant="h4" gutterBottom >
          <center>Your Details</center>
        </Typography> <br></br>
        <div>
          <Label>User Name:</Label>
          <ValueLabel>{labDetails.userName}</ValueLabel>
        </div>
        <div>
          <Label>Name:</Label>
          <ValueLabel>{labDetails.name}</ValueLabel>
        </div>
        <div>
          <Label>Address:</Label>
          <ValueLabel>{labDetails.address}</ValueLabel>
        </div>
        <div>
          <Label>Phone:</Label>
          <ValueLabel>{labDetails.phone}</ValueLabel>
        </div>
        <div>
          <Label>District:</Label>
          <ValueLabel>{labDetails.district}</ValueLabel>
        </div>
        <div>
          <Label>City:</Label>
          <ValueLabel>{labDetails.city}</ValueLabel>
        </div>
        {/* Add buttons for editing and deleting accounts */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" color="primary" style={{ width: '48%' }} onClick={handleEdit}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" style={{ width: '48%' }}>
            Delete Account
          </Button>
        </div>
      </Paper>
    </StyledContainer>
  );
};

export default LabProfile;
