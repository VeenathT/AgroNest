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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (formData.userName) {
      try {
        const response = await axios.get('http://localhost:8070/labAccount/checkUserName', { params: { userName: formData.userName } });
        if (response.data.status) {
          alert('Username already exists');
        } else {
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
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  

  return (
    <form onSubmit={(e) => handleSignup(e)}>
    <Container>
      <FormContainer>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h1>
        <div>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleChange}
            label="Address"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="district"
            value={formData.district}
            onChange={handleChange}
            label="District"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="city"
            value={formData.city}
            onChange={handleChange}
            label="City"
            fullWidth
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            label="Username"
            fullWidth
            variant="outlined"
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
    </Container></form>
  );
};

export default SignupForm;
