import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/Farmer/login', formData);
      const { user } = response.data;
      setIsLoggedIn(true);
      navigate(`/farmer/${user._id}`); // Directly navigate to the profile page
    } catch (error) {
      console.error('Login error:', error);
      setError('Incorrect username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ maxWidth: 500 }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center">Login</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" sx={{ bgcolor: '#388e3c', color: '#ffffff', '&:hover': { bgcolor: '#388e3c' }, width: '100%', maxWidth: '200px' }} type="submit">Login</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
