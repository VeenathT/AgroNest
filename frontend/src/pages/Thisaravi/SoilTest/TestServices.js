import React from 'react';
import { styled } from '@mui/material/styles';
import Sidebar from '../../../Component/Thisaravi/Sidebar';
import { Button, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const TestServices = () => {
    return (
      <div>
        <Sidebar />
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Soil Test
          </Typography>
          <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{ textAlign: 'center', marginTop:'100px' }}>
              <Button component={Link} to="/soil-test-request" variant="contained" style={{ backgroundColor: '#0f5132', color: 'white', width: '300px', marginBottom: '10px' }}>
                Request for a Soil Test
              </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button component={Link} to="/pending-requests" variant="contained" style={{ backgroundColor: '#0f5132', color: 'white', width: '300px', marginBottom: '10px' }}>
                Pending Requests
              </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button component={Link} to="/resolved-requests" variant="contained" style={{ backgroundColor: '#0f5132', color: 'white', width: '300px', marginBottom: '10px' }}>
                Resolved Requests
              </Button>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button component={Link} to="/test-types" variant="contained" style={{ backgroundColor: '#0f5132', color: 'white', width: '300px', marginBottom: '10px' }}>
                Soil Test Types
              </Button>
          </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

export default TestServices;
