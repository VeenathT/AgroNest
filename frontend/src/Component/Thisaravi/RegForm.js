import React, { useState } from 'react';
import { Button, Grid, Input, Typography } from "@mui/material";
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const RegForm = (props) => {
   const Navigate= useNavigate();

   const [formData, setFormData] = useState({
      first_name: '',
    last_name: '',
    email: '',
    phone: '',
    district: '',
    city: '',
    userName: '',
    password: '',
  });

  const [errorMessages, setErrorMessages] = useState({
   email: '',
   phone: '',
 });
 
  const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prevData) => ({
     ...prevData,
     [name]: value,
   }));
 };

 const handleEmailBlur = () => {
   const { email } = formData;
   if (email && !email.includes('@')) {
      setErrorMessages((prevErrors) => ({
         ...prevErrors,
         email: 'Incorrect email',
      }));
   } else {
      setErrorMessages((prevErrors) => ({
         ...prevErrors,
         email: '',
      }));
   }
};

const handlePhoneBlur = () => {
   const { phone } = formData;
   if (phone && phone.length !== 10) {
      setErrorMessages((prevErrors) => ({
         ...prevErrors,
         phone: 'Invalid phone number',
      }));
   } else {
      setErrorMessages((prevErrors) => ({
         ...prevErrors,
         phone: '',
      }));
   }
};

const handleSubmit = async (e) => {
   e.preventDefault();
   try {
       const response = await axios.post('http://localhost:8070/Farmer/add', formData); 
       console.log(response.data); 
       setFormData({
         first_name: '',
         last_name: '',
         email: '',
         phone: '',
         district: '',
         city: '',
         userName: '',
         password: '',
       });
       Navigate(`/Login`);
   } catch (error) {
       console.error('Error:' , error.response.data);
        setErrorMessages(error.response.data.error);
   }
};


    return (
      <form onSubmit={handleSubmit}>
        <Grid
            container
            spacing={2}
            
            sx={{
               maxWidth: '600px',
               margin: '-20px auto',
               marginTop: '5cm',
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

            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="first_name"
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
                    id='first_name'
                    name="first_name"
                    sx={{width:'400px'}}
                    value={formData.first_name}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="last_name"
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
                    id='last_name'
                    name="last_name"
                    sx={{width:'400px'}}
                    value={formData.last_name}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sx={{display:'flex'}}>
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
                    type="email"
                    id='email'
                    name="email"
                    sx={{width:'400px'}}
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur}
                 />
            </Grid>
            {errorMessages.email && (
          <Typography sx={{ color: 'red' }}>{errorMessages.email}</Typography>
        )}
            <Grid item xs={12} sx={{display:'flex'}}>
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
                    type="text"
                    id='phone'
                    name="phone"
                    sx={{width:'400px'}}
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handlePhoneBlur}
                 />
            </Grid>
            {errorMessages.phone && (
          <Typography sx={{ color: 'red' }}>{errorMessages.phone}</Typography>
        )}
            <Grid item xs={12} sx={{display:'flex'}}>
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

            <Grid item xs={12} sx={{display:'flex'}}>
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

            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="userName"
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
                    id='userName'
                    name="userName"
                    sx={{width:'400px'}}
                    value={formData.userName}
                    onChange={handleChange}
                 />
            </Grid>
   
            <Grid item xs={12} sx={{display:'flex'}}>
                <Typography
                 component={'label'}
                 htmlForm="password"
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
                    id='password'
                    name="password"
                    sx={{width:'400px'}}
                    value={formData.password}
                    onChange={handleChange}
                 />
            </Grid>

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          type='submit'
          sx={{
            backgroundColor: '#2DA771',
            color: '#000000',
            '&:hover': {
              opacity: '0.7',
              backgroundColor: '#2DA771'
            }
          }}
        >
          Sign Up
        </Button>
      </Grid>
        </Grid>
        </form>
    );
}

export default RegForm