import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, styled } from '@mui/material';
import axios from 'axios'; 


const Container = styled('div')({
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', 
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'fixed',
  bottom: '60px',
  top: '60px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const FormContainer = styled('div')({
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  padding: '20px',
  border: '1px solid #ccc', 
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

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'phone') {
      
      if (!/^[0-9]{10}$/.test(e.target.value)) {
        setPhoneError('Invalid phone number');
      } else {
        setPhoneError('');
      }
    }

    if (e.target.name === 'userName') {
      try {
        const response = await axios.get('http://localhost:8070/labAccount/checkUserName', {
          params: {
            userName: e.target.value
          }
        });
        if (response.data.status) {
          setUsernameError('Username already exists');
        } else {
          setUsernameError('');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error in fetching usernames.');
      }
    }
    
  };

  const handleSignup = async (e) => {
    e.preventDefault(); 
    if (formData.userName && !phoneError && !usernameError) {
      try {
        const response = await axios.post('http://localhost:8070/labAccount/add', formData);
        console.log(response.data);
        alert('Signup Successful!');
        navigate('/labLogin');
      } catch (error) {
        console.error('Error:', error);
        alert('Signup Failed! Please try again later.');
      } finally {
        setButtonDisabled(false); 
      }
    }
  };
  
  return (
    <form onSubmit={(e) => handleSignup(e)}>
      <Container>
        <FormContainer>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Name"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="address"
              value={formData.address}
              onChange={handleChange}
              label="Address"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              label="Phone"
              fullWidth
              variant="outlined"
              error={!!phoneError}
              helperText={phoneError}
            />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="district"
              value={formData.district}
              onChange={handleChange}
              label="District"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="city"
              value={formData.city}
              onChange={handleChange}
              label="City"
              fullWidth
              variant="outlined"
            />
          </div>
          <div style={{ marginBottom: '5px' }}>
            <TextField
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              label="Username"
              fullWidth
              variant="outlined"
              error={!!usernameError}
              helperText={usernameError}
            />
          </div>
          <div>
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
          <div style={{ marginTop: '20px' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </div>
        </FormContainer>
      </Container>
    </form>
  );
};

export default SignupForm;
