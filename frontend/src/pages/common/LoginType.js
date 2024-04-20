import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import '../../styles/common_css/logintype.css';

const Logintype = () => {
  return (
    <div className="container"> {/* Apply the "container" class */}
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        style={{ height: '100vh' }}
      >
        <Grid item>
          <Typography variant="h4" gutterBottom className="title">
            Choose Your Role
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/farmers"
            style={{ borderRadius: 20, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)' }}
          >
            Farmers
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/loginDealer"
            style={{ borderRadius: 20, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)' }}
          >
            Dealers
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/laboratories"
            style={{ borderRadius: 20, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.6)' }}
          >
            Laboratories
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Logintype;
