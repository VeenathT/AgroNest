import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Box, Avatar, Typography,FormControl,InputLabel, TextField, Select, MenuItem, Button,CssBaseline } from '@mui/material';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PopupMessage from '../common/PopUp';

const SignUp = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const districts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
    'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
    'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
    'Trincomalee', 'Vavuniya'
  ];

  const handleSignUp = async (event) => {
    event.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        setErrorMessage('Invalid email format');
        return;
    }

    try {
      const response = await axios.post('http://localhost:8070/dealer/registerDealer', {
        name: name,
        address: address,
        email: email,
        phone: phone,
        storeLocation: storeLocation,
        username: username,
        password: password,
        reEnteredPassword: reEnteredPassword
      });

      console.log('Signup successful:', response.data);
      setSuccessMessage('Signup successful');
      setTimeout(() => {
        navigate('/loginDealer');
      }, 2000);
      
      
    } catch (error) {
        if (error.response && error.response.data) {
            console.error('Signup error:', error.response.data);
          } else {
            console.error('Signup error:', error.message); 
          }
          setErrorMessage(error.response.data.error);
    }
  };

  const handleClosePopup = () => {
    
    setErrorMessage('');
    setSuccessMessage('');
    
  };

  return (
    <Container component="main" maxWidth="md" style={{ marginTop: '10rem', borderRadius: '20px' }} >
      <CssBaseline />
      <Paper elevation={6} square sx={{ borderRadius: '20px',boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.8)' }}>
        <Box
          sx={{
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '2rem',
            paddingBottom: '1rem',
            borderRadius: '20px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#0f5132' }}>
            <LockOutlinedIcon style={{ fontSize: 28, color: 'white'}} />
          </Avatar>

          <Typography component="h1" variant="h4" sx={{ mb: 2, color: '#0f5132' }}>
            Dealer Sign Up
          </Typography>

          <Box component="form" noValidate onSubmit={handleSignUp} sx={{ mt: 1, width: '100%' }}>

          <Grid container spacing={2}>
              <Grid item xs={6}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{mt: 3.9,
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              autoFocus
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder="enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />

            </Grid>
            <Grid item xs={6}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="text"
              autoComplete="phone"
              placeholder="e.g. 07XXXXXXXX"
              autoFocus
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />
            
            <FormControl fullWidth margin="normal" sx={{ borderRadius: '20px', mt: 2, mb: -0.1 }}>
            <InputLabel htmlFor="storelocation" sx={{ color: '#0f5132',marginTop: '15px' }}>Store District *</InputLabel>
            <Select
              margin="normal"
              required
              fullWidth
              id="storelocation"
              labelId="store-location-label"
              name="storelocation"
              autoFocus
              value={storeLocation}
              onChange={(e) => setStoreLocation(e.target.value)}
              sx={{ borderRadius: '20px',mt: 2, mb: 1,
              '& .MuiInputLabel-root': { 
                color: '#0f5132',
                '&.Mui-focused': {
                  color: '#0f5132' 
                }
              },
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#0f5132 !important', 
              }, 
            } }}
            InputLabelProps={{
              shrink: true, // Set shrink to true
              sx: { position: 'absolute', top: '-8px', left: '12px', backgroundColor: '#ffffff' } 
            }}
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district}>{district}</MenuItem>
              ))}
            </Select>
            </FormControl>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="e.g. exmaple@gmail.com"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                '& .MuiInputLabel-root': { 
                  '&.Mui-focused': {
                    color: '#0f5132' 
                  }
                },
              borderRadius: '20px',
              '& .MuiOutlinedInput-root': { 
                borderRadius: '20px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#0f5132 !important', 
                }, 
              }
            }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="repassword"
              label="Re-enter Password"
              type="password"
              id="repassword"
              autoComplete="re-entered-password"
              placeholder="re-enter the password"
              value={reEnteredPassword}
              onChange={(e) => setReEnteredPassword(e.target.value)}
              sx={{
                        '& .MuiInputLabel-root': { 
                          '&.Mui-focused': {
                            color: '#0f5132' 
                          }
                        },
                      borderRadius: '20px',
                      '& .MuiOutlinedInput-root': { 
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#0f5132 !important', 
                        }, 
                      }
            }}
            />

            </Grid>
            </Grid>

            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/loginDealer" variant="body2" sx={{ color: 'red', textDecoration: 'none' }}>
                  {"Already have an account? Login"}
                </Link>
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '20px',
                  color: 'white',
                  backgroundColor: '#0f5132',
                  padding: '10px 20px', 
                  width: '350px', 
                }}
              >
                Sign Up
              </Button>
            </Box>
            
          </Box>
        </Box>
      </Paper>

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </Container>
  );
};

export default SignUp;
