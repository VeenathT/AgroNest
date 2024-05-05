import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, Link } from '@mui/material';
import Sidebar from '../../Component/Thisaravi/Sidebar';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FarmerProfile = () => {
  const { farmerID } = useParams();
  const history = useNavigate();
  const [farmerData, setFarmerData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Farmer/get/${farmerID}`);
        setFarmerData(response.data.farmer);
        setError(null);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        setError('Error fetching farmer data');
      }
    };

    fetchFarmerData();
  }, [farmerID]);

  const handleEditProfile = () => {
    history(`/edit-profile/${farmerID}`);
  };

  return (
    <Grid
      container
      spacing={2}
      sx={{
        maxWidth: '600px',
        margin: '-20px auto',
        marginTop: '250px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Container maxWidth="md">
        {error ? (
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        ) : (
          <>
            <Typography variant="h5" gutterBottom sx={{ color: 'green' }}>
              Welcome to AGRONEST!
            </Typography>
            {farmerData && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Name: {farmerData.first_name} {farmerData.last_name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Email: {farmerData.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Phone: {farmerData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    District: {farmerData.district}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    City: {farmerData.city}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Button onClick={handleEditProfile} variant="contained" color="primary">
                    Edit Profile
                  </Button>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </Container>
    </Grid>
  );
};

export default FarmerProfile;
