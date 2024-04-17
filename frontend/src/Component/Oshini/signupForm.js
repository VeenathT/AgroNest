import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios'; // Don't forget to import axios

// Define your custom styles using makeStyles
const useStyles = styled((theme) => ({
  formContainer: {
    maxWidth: 400,
    margin: 'auto',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
}));

const SignupForm = () => {
  const classes = useStyles();
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
      navigate.push('/labLogin');
    } catch (error) {
      console.error('Error:', error);
      alert('Signup Failed! Please try again later.');
    }
  };

  return (
    <div className={classes.formContainer}>
      <h2 className={classes.formTitle}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.inputField}>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            label="Name"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleChange}
            label="Address"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            name="district"
            value={formData.district}
            onChange={handleChange}
            label="District"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            name="city"
            value={formData.city}
            onChange={handleChange}
            label="City"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
          <TextField
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            label="Username"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.inputField}>
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
        <Button type="submit" className={classes.submitButton} variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
