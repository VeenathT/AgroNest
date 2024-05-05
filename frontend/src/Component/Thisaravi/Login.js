import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
        const { token } = response.data.username;
        localStorage.setItem('logId', token);
        console.log('Token:', token);
    } catch (error) {    
        console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
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
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit" fullWidth>Login</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Login;
