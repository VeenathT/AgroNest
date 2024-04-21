import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
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

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8070/labAccount/login', {
            userName: formData.userName,
            password: formData.password,
          });
      
      if (response.data.success) {
        sessionStorage.setItem('userName', formData.userName);
        setIsLoggedIn(true);
       
        navigate('/labDash');
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      setLoginError('Login failed. Please try again later.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
        <form onSubmit={handleLogin}>
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
          {loginError && <p style={{ color: 'red', marginBottom: '20px' }}>{loginError}</p>}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        <p style={{ marginTop: '20px', textAlign: 'center' }}>
          Don't have an account? <Link to="/labSignup">Sign up</Link>
        </p>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
