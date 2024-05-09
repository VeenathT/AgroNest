import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Typography, Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Logintype = () => {
  return (
    <Container style={{ backgroundColor: 'white', width: '100%', maxWidth: '500px', height: '70vh', 
    padding: '20px', marginTop: '10rem', borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', border: '3px solid black' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ height: '100%' }}
      >
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: '#0f5132' }}>
            <AccountCircleOutlinedIcon style={{ fontSize: 35, color: 'white' }} />
          </Avatar>
        </Grid>

        <Grid item>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#0f5132' }}>
            Profile
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to={`/Profile/${localStorage.getItem('logId')}`} sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '200px'
          }}>
            Farmer
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/profileDealer" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '200px'
          }}>
            Dealer
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/laboratories" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '200px'
          }}>
            Laboratory
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/laboratories" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '200px'
          }}>
            Administrator
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Logintype;
