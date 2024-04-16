import React, { useState } from 'react';
import { Button, Grid, Input, Typography } from "@mui/material";
import axios from 'axios';

const RegForm = (props) => {

   const [formData, setFormData] = useState({
      fName: '',
      lName: '',
      email: '',
      phone: '',
      district: '',
      city: '',
      un: '',
      pw: ''
  });

  const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({
       ...formData,
       [name]: value
   });
};

const handleSubmit = async (e) => {
   e.preventDefault();
   try {
       const response = await axios.post('http://localhost:8070/Farmer/add', formData); // Make POST request to your backend API
       console.log(response.data); // Log response from the backend
       setFormData({
           fName: '',
           lName: '',
           email: '',
           phone: '',
           district: '',
           city: '',
           un: '',
           pw: ''
       });
   } catch (error) {
       console.error('Error:', error);
   }
};


    return (
      <form onSubmit={handleSubmit}>
        <Grid
            container
            spacing={2}
            
            sx={{
               maxWidth: '900px',
               margin: '-20px auto',
               boxSizing: 'border-box',
               backgroundColor: 'rgba(255, 255, 255, 0.8)',
               borderRadius: '20px',
               padding: '20px',
               boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
               textAlign: 'center',
            }}
        >
            <Grid item xs={12}>
                <Typography component={'h1'} sx={{color: '#000000'}}>Create Account</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="fName"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                First Name
                 </Typography>
                 <Input
                    type="text"
                    id='fName'
                    name="fName"
                    sx={{width:'400px'}}
                    value={formData.fName}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="lName"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Last Name
                 </Typography>
                 <Input
                    type="text"
                    id='lName'
                    name="lName"
                    sx={{width:'400px'}}
                    value={formData.lName}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="email"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Email
                 </Typography>
                 <Input
                    type="text"
                    id='email'
                    name="email"
                    sx={{width:'400px'}}
                    value={formData.email}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="phone"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Phone
                 </Typography>
                 <Input
                    type="number"
                    id='phone'
                    name="phone"
                    sx={{width:'400px'}}
                    value={formData.phone}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="district"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                District
                 </Typography>
                 <Input
                    type="text"
                    id='district'
                    name="district"
                    sx={{width:'400px'}}
                    value={formData.district}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="city"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                City
                 </Typography>
                 <Input
                    type="text"
                    id='city'
                    name="city"
                    sx={{width:'400px'}}
                    value={formData.city}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="un"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Username
                 </Typography>
                 <Input
                    type="text"
                    id='un'
                    name="un"
                    sx={{width:'400px'}}
                    value={formData.un}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="pw"
                 sx={{
                    color: '#000000',
                    marginRight: '20px',
                    fontSize: '16px',
                    width: '100px',
                    display: 'block',
                 }}
                 >
                Password
                 </Typography>
                 <Input
                    type="text"
                    id='pw'
                    name="pw"
                    sx={{width:'400px'}}
                    value={formData.pw}
                    onChange={handleChange}
                 />
            </Grid>

            <Button
               type='submit'
                sx={{
                    margin: 'auto',
                    marginBottom: '20px',
                    backgroundColor: '#2DA771',
                    color: '#000000',
                    marginLeft: '15px',
                    marginTop: '20px',
                    '&:hover':{
                        opacity: '0.7',
                        backgroundColor: '#2DA771'
                    }
                }}
            >
                Sign Up
            </Button>
        </Grid>
        </form>
    );
}

export default RegForm;