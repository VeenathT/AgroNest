import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FarmerProfile = () => {
  const { farmerID } = useParams();
  console.log("farmerID:", farmerID); 
  const [farmerData, setFarmerData] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Farmer/get/${farmerID}`);
        setFarmerData(response.data.farmer);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFarmerData();
  }, [farmerID]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Farmer Profile
      </Typography>
      {farmerData && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Name: {farmerData.first_name} {farmerData.last_name}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Email: {farmerData.email}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              Phone: {farmerData.phone}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              District: {farmerData.district}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1">
              City: {farmerData.city}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default FarmerProfile;
