import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Grid, Typography, Avatar } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Logintype = () => {
  return (
    <Container style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', height: '80vh', 
    padding: '10px', marginTop: '10rem', borderRadius: '50px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)', border: '3px solid black' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ height: '100%' }}
      >
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: '#229954' }}>
            <AccountCircleOutlinedIcon style={{ fontSize: 35, color: 'white' }} />
          </Avatar>
        </Grid>

        <Grid item>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#0f5132' }}>
            Login
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/Login" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '300px'
          }}>
            Farmer
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/loginDealer" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '300px'
          }}>
            Dealer
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/labLogin" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '300px'
          }}>
            Laboratory
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/admin/login" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '300px'
          }}>
            Administrator
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="success" component={Link} to="/MLogin" sx={{
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)',
            width: '300px'
          }}>
            Manager
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Logintype;
