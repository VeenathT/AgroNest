import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, styled } from '@mui/material';
import axios from 'axios'; // Don't forget to import axios

// Define your custom styles using styled
const Container = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Adjust height as needed
  backgroundColor: 'rgba(255, 255, 255, 0.8)', // White with 80% opacity
  position: 'fixed',
  bottom: '20px',
  top: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const FormContainer = styled('div')({
  maxWidth: 400,
  padding: '20px',
  border: '1px solid #ccc', // Add border around the container
  borderRadius: '5px',
});

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    district: '',
    city: '',
    userName: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/lab_account/labAccounts/add', formData);
      console.log(response.data);
      alert('Signup Successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Signup Failed! Please try again later.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="district"
              value={formData.district}
              onChange={handleChange}
              label="District"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              label="Username"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              name="password"
              value={formData.password}
              onChange={handleChange}
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignupForm;

