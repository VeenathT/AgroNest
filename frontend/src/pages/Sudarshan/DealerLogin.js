import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Container, Grid, Paper, Box, Avatar, Typography,TextField, Button,CssBaseline } from '@mui/material';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PopupMessage from '../common/PopUp';

const DealerLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/dealer/loginDealer', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setSuccessMessage('Login successful');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response.data.error);
    }
  };

  const handleClosePopup = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <Container component="main" style={{ width: '80%', maxWidth: '600px', marginTop: '10rem', borderRadius: '20px' }}>
      <CssBaseline />
      <Paper elevation={6} square sx={{ borderRadius: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '2rem',
            paddingBottom: '1rem',
            borderRadius: '20px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#0f5132' }}>
            <LockOutlinedIcon style={{ fontSize: 28, color: 'white' }} />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ mb: 2, color: '#0f5132' }}>
            Dealer Login 
          </Typography>

          <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#0f5132',
                  },
                },
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0f5132 !important',
                  },
                },
                width: '90%',
              }}
            />

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
              sx={{
                '& .MuiInputLabel-root': {
                  '&.Mui-focused': {
                    color: '#0f5132',
                  },
                },
                borderRadius: '20px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '20px',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#0f5132 !important',
                  },
                },
                width: '90%',
              }}
            />

            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, borderRadius: '20px', color: 'white', backgroundColor: '#0f5132', padding: '10px 20px', width: '350px' }}
              >
                Login
              </Button>
            </Box>

            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/signupDealer" variant="body2" sx={{ color: 'red', textDecoration: 'none' }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Paper>

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}

    </Container>
  );
};

export default DealerLogin;
