import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    city: '',
    phone: '',
    email: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8070/api/admin', formData);
      alert('Data submitted successfully');
      // Optionally clear form fields after submission
      setFormData({
        username: '',
        password: '',
        city: '',
        phone: '',
        email: '',
        address: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'70px',height: '100vh', backgroundColor: '#f0f0f0' }}>
     <Link to="/viewadmin">
      <Button type="button" variant="contained" color="primary" style={{marginRight:"100px",width:"300px"}}>
        View Admin Panel
      </Button>
    </Link>
      <form style={{ width: '500px', padding: '20px', backgroundColor: 'white' }} onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="text"
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="text"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          type="text"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </div>
  );
};

export default Form;
