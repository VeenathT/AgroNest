import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from '../../styles/Oshini/signupForm.css';

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
      console.log(response.data); // Log response from the backend
      // Assuming response.data contains some confirmation message or data
      // Display success message or perform other actions if needed
      alert('Signup Successful!');
      // Navigate to labLogin.js page after successful signup
      navigate.push('/labLogin'); // Specify the path to labLogin.js
    } catch (error) {
      console.error('Error:', error);
      // Display error message or perform other actions if needed
      alert('Signup Failed! Please try again later.');
    }
  };
  

  return (
    <div className={classes.form-container}>
      <h2 className={classes.form-title}>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className={classes.input-field}>
          <label className={classes.input-label}>Name</label>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>Address</label>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>Phone</label>
          <TextField
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>District</label>
          <TextField
            name="district"
            value={formData.district}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>City</label>
          <TextField
            name="city"
            value={formData.city}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>Username</label>
          <TextField
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />
        </div>
        <div className={classes.input-field}>
          <label className={classes.input-label}>Password</label>
          <TextField
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            type="password"
            variant="outlined"
          />
        </div>
        <Button type="submit" className={classes.submit-button} variant="contained">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;

