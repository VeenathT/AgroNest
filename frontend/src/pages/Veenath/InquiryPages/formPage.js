import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle, FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft } from '@mui/icons-material';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Avatar, Box, Snackbar, IconButton,Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const StyledSnackbar = styled(Snackbar)({
  position: 'fixed',
  bottom: '20px',
  left: '50%',
  transform: 'translateX(-50%)',
});

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [categoryValue, setCategoryValue] = useState(location.search.split('=')[1]);
  const [category, setCategory] = useState(location.search.split('=')[1]);
  const [area, setArea] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const inquiryId = new URLSearchParams(location.search).get('id');
  const emailRegex = /\S+@\S+\.\S+/; 

  useEffect(() => {
    const fetchInquiryDetails = async () => {
      try {
        if (inquiryId) {
          const response = await axios.get(`http://localhost:8070/api/reports/${inquiryId}`);
          const { name, topic, description, priority, area ,category } = response.data;
          console.log('Fetched inquiry details:', response.data);
          setName(name);
          setTopic(topic);
          setDescription(description);
          setPriority(priority);
          setArea(area);
          console.log('Category ID:', category);
          setCategoryValue(category);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiryDetails();
  }, [location.search, inquiryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!emailRegex.test(name)) {
        alert('Please enter a valid email address with the format example@gmail.com');
        return;
      }

      if (inquiryId) {
        await axios.put(`http://localhost:8070/api/reports/${inquiryId}`, {
          name,
          topic,
          description,
          priority,
          categoryValue,
          area
        });
        setSuccessMessage('Inquiry updated successfully!');
        setOpenSnackbar(true);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000);
      } else {
        await axios.post('http://localhost:8070/api/reports', {
          name,
          topic,
          description,
          priority,
          category,
          area
        });
        setSuccessMessage('Inquiry submitted successfully!');
        setOpenSnackbar(true);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '100px', overflowY: 'auto' }}>
      <h1>{inquiryId ? 'Update Inquiry' : 'Submit Inquiry'}</h1>
      <Stack sx={{ width: '100%', alignItems: 'center',marginBottom: '50px', marginTop:'50px' }} spacing={4}>
        <CustomizedSteppers />
      </Stack>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '40px',marginTop:'20px' }}>
          <TextField  color="success" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder=" E-mail (@gmail.com)"
            required
            InputProps={{
              startAdornment: <AccountCircle />,
            }}
          />
          <TextField  
            value={categoryValue || ''}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            disabled
            variant="outlined"
            style={{ marginLeft: '50px', color: '#fffff', backgroundColor: '#86B579' }}
          />
          
          <FormControl color="success" style={{ marginLeft: '70px', minWidth: '250px' }}>
            <InputLabel>Select Your Area</InputLabel>
            <Select value={area} onChange={(e) => setArea(e.target.value)} required>
              <MenuItem value="">Select Area</MenuItem>
              <MenuItem value="Kandy">Kandy</MenuItem>
              <MenuItem value="Colombo">Colombo</MenuItem>
              <MenuItem value="Galle">Galle</MenuItem>
              <MenuItem value="Jaffna">Jaffna</MenuItem>
              <MenuItem value="Kurunegala">Kurunegala</MenuItem>
              <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
              <MenuItem value="Gampaha">Gampaha</MenuItem>
              <MenuItem value="Matara">Matara</MenuItem>
              <MenuItem value="Hambantota">Hambantota</MenuItem>
              <MenuItem value="Badulla">Badulla</MenuItem>
              <MenuItem value="Ratnapura">Ratnapura</MenuItem>
              <MenuItem value="Ampara">Ampara</MenuItem>
              <MenuItem value="Monaragala">Monaragala</MenuItem>
              <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
              <MenuItem value="Puttalam">Puttalam</MenuItem>
              <MenuItem value="Kegalle">Kegalle</MenuItem>
              <MenuItem value="Matale">Matale</MenuItem>
              <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
              <MenuItem value="Trincomalee">Trincomalee</MenuItem>
              <MenuItem value="Batticaloa">Batticaloa</MenuItem>
              <MenuItem value="Mannar">Mannar</MenuItem>
              <MenuItem value="Vavuniya">Vavuniya</MenuItem>
              <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
              <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
            </Select>
          </FormControl>
          
        </Box>
        <TextField label="Topic" color="success" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="write your heading here"
          required
          fullWidth
          style={{ marginBottom: '30px' }}
        />
        <TextField label="Description" color="success" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="write your issue here..."
          required
          fullWidth
          multiline
          variant="outlined"
          maxRows={10}
          InputProps={{
            endAdornment: (
              <Box sx={{ display: '-ms-flexbox', gap: '10px' ,height: '200px',width:'500px'}}>
                <IconButton>
                  <FormatBold />
                </IconButton>
                <IconButton>
                  <FormatItalic />
                </IconButton>
                <IconButton>
                  <FormatUnderlined />
                </IconButton>
                <IconButton>
                  <FormatAlignLeft />
                </IconButton>
              </Box>
            ),
          }}
          style={{ marginBottom: '50px' }}
        />
        <FormControl color="success" fullWidth style={{ marginBottom: '100px' }}>
          <InputLabel>Select Priority</InputLabel>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <MenuItem value="">Select Priority</MenuItem>
            <MenuItem value="Low">
              <Avatar  variant="rounded" sx={{ backgroundColor: 'green' }}>L</Avatar> FAQ and Self-Help
            </MenuItem>
            <MenuItem value="Medium">
              <Avatar  variant="rounded"sx={{ backgroundColor: 'orange' }}>M</Avatar> General Inquiries
            </MenuItem>
            <MenuItem value="High">
              <Avatar  variant="rounded"sx={{ backgroundColor: 'red' }}>H</Avatar> Urgent Support Requests
            </MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "250px", height: "50px", backgroundColor: "green", ml: "500px" }}>
        {inquiryId ? 'Update' : 'Send'}
        </Button>
      </form>
      <StyledSnackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleCloseSnackbar} variant="filled" severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </MuiAlert>
      </StyledSnackbar>
    </div>
    
  );
}
const CustomizedSteppers = () => {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={1} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}


const steps = ['Select Category', 'Fill the Inquiry Form', 'Submit to the system'];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${StepConnector.defaultProps?.classes?.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${StepConnector.defaultProps?.classes?.active}`]: {
    [`& .${StepConnector.defaultProps?.classes?.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${StepConnector.defaultProps?.classes?.completed}`]: {
    [`& .${StepConnector.defaultProps?.classes?.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${StepConnector.defaultProps?.classes?.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const CustomStepIcon = ({ active, completed, icon }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {completed ? <CheckCircleIcon /> : active ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />}
      <Typography sx={{ ml: 1, color: active ? 'text.primary' : 'text.secondary', fontWeight: 'bold' }}>{icon}</Typography>
    </Box>
  );
}


export default FormPage;
