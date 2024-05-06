import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import paddy from '../../images/common/paddy.jpg';
import PopupMessage from '../../pages/common/PopUp';

const greenTheme = createTheme({
  palette: {
    primary: {
      main: '#0f5132',
    },
  },
});

const AdminLogin = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8070/admin/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setSuccessMessage('Login successful');
      setTimeout(() => {
        navigate('/admin/home');
      }, 3000);
      
    } catch (error) {
      setError('Invalid username or password');
      setErrorMessage('Login failed. Invalid username or password.');
    }
  };

  const handleClosePopup = () => {
    setErrorMessage('');
    setSuccessMessage('');
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
              my: 1,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%', 
              paddingTop: '2rem', 
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
              Administrator Login
            </Typography>

            <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
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
                  sx: { borderRadius: '20px' } 
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
                InputProps={{
                  sx: { borderRadius: '20px' } 
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
               Administrator Login
              </Button>
              
              <Grid container justifyContent="flex-end">
                <Grid item xs>
                  
                </Grid>
                <Grid item>
                  
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}

    </ThemeProvider>
  );
};

export default AdminLogin;
