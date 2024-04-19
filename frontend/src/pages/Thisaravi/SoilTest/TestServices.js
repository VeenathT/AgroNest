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
            <Grid item sx={{ marginLeft: '20px',marginTop:'300px' }}>
              <Button component={Link} to="/soil-test-request" variant="contained" color="primary">
                Request for a Soil Test
              </Button>
            </Grid>
            <Grid item sx={{ marginLeft: '20px',marginTop:'300px' }}>
              <Button component={Link} to="/pending-requests" variant="contained" color="primary">
                Pending Requests
              </Button>
            </Grid>
            <Grid item sx={{ marginLeft: '20px',marginTop:'300px' }}>
              <Button component={Link} to="/resolved-requests" variant="contained" color="primary">
                Resolved Requests
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

export default TestServices;
