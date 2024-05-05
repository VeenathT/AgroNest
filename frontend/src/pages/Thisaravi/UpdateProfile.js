import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';

const UpdateProfile = () => {
  const { farmerID } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    district: '',
    city: '',
    userName: '',
    password: ''
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFarmerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/Farmer/get/${farmerID}`);
        const farmer = response.data.farmer;
        setFormData({
          first_name: farmer.first_name,
          last_name: farmer.last_name,
          email: farmer.email,
          phone: farmer.phone,
          district: farmer.district,
          city: farmer.city,
          userName: farmer.userName,
          password: farmer.password
        });
        setError(null);
      } catch (error) {
        console.error('Error fetching farmer data:', error);
        setError('Error fetching farmer data');
      }
    };

    fetchFarmerData();
  }, [farmerID]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8070/Farmer/update/${farmerID}`, formData);
      navigate(`/farmer/${farmerID}`)
      // Redirect or show success message
    } catch (error) {
      console.error('Error updating farmer data:', error);
      setError('Error updating farmer data');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: '20px', marginTop:20}}>
        <Typography variant="h5" gutterBottom>
          Edit Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProfile;
