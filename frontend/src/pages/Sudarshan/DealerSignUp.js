import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { MenuItem, Select, FormControl, InputLabel, Button, TextField } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import paddy from '../../images/common/paddy.jpg';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#0f5132', // Green color
    },
  },
});

const SignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const navigate = useNavigate();

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
    'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
    'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
    'Trincomalee', 'Vavuniya'
  ];

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/dealer/registerDealer', {
        name: name,
        address: address,
        email: email,
        phone: phone,
        storeLocation: storeLocation,
        username: username,
        password: password,
        reEnteredPassword: reEnteredPassword
      });

      console.log('Signup successful:', response.data);
      navigate('/login');
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Signup error:', error.response.data);
          } else {
            console.error('Signup error:', error.message); 
          }
    }
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${paddy})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 5,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', // Adjusted to center content vertically
              paddingTop: '2rem', // Added padding top to move content upper
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Sign Up
            </Typography>

            <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                autoFocus
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                type="text"
                autoComplete="phone"
                autoFocus
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <Select
                margin="normal"
                required
                fullWidth
                id="storelocation"
                label="StoreDistrict"
                name="storelocation"
                autoFocus
                value={storeLocation}
                onChange={(e) => setStoreLocation(e.target.value)}
                sx={{ borderRadius: '20px' }}

              >
                {districts.map((district, index) => (
                  <MenuItem key={index} value={district}>{district}</MenuItem>
                ))}
              </Select>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Re-enter Password"
                type="password"
                id="repassword"
                autoComplete="re-entered-password"
                value={reEnteredPassword}
                onChange={(e) => setReEnteredPassword(e.target.value)}
                InputProps={{
                  sx: { borderRadius: '20px' } // Rounded corners style for the input
                }}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: '20px' }}
              >
                Sign Up
              </Button>
              
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SignUp;
