import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, styled } from '@mui/material';
import axios from 'axios'; // Don't forget to import axios

// Define your custom styles using styled
const Container = styled('div')({
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Adjust height as needed
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // White with 80% opacity
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

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [userNameError, setUserNameError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });


    if (formData.userName && name === 'userName') {
      axios.get('http://localhost:8070/labAccount/checkUserName' , {userName: formData.userName})
        .then((response) => {
          if (response.data.status) {
            setUserNameError('Username already exists');
            setButtonDisabled(true);
          } else {
            setUserNameError('');
            setButtonDisabled(false);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
    
  };

  



  const handleSignup = async (e) => {
    e.preventDefault();
    setButtonDisabled(true); 
    try {
      const response = await axios.post('http://localhost:8070/labAccount/add', formData);
      console.log(response.data);
      alert('Signup Successful!');
      navigate('/labLogin');
    } catch (error) {
      console.error('Error:', error);
      alert('Signup Failed! Please try again later.');
    } finally {
      setButtonDisabled(false); // Re-enable the button after form submission
    }
  };

  return (
    <Container>
      <FormContainer>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <form onSubmit={handleSignup}>
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
               error={!!userNameError}
               helperText={userNameError}
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
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={buttonDisabled}>
            Sign Up
          </Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default SignupForm;

