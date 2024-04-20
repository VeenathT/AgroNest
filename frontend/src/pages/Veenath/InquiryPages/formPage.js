import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AccountCircle, FormatBold, FormatItalic, FormatUnderlined, FormatAlignLeft } from '@mui/icons-material';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Avatar, Box, Snackbar, IconButton } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/system';

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
    <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '64px', overflowY: 'auto' }}>
      <h1>{inquiryId ? 'Update Inquiry' : 'Submit Inquiry'}</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px' }}>
          <TextField  color="secondary" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
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
            style={{ marginLeft: '50px', color: '#fffff', backgroundColor: '#B2BEB5' }}
          />
          
          <FormControl color="secondary" style={{ marginLeft: '70px', minWidth: '250px' }}>
            <InputLabel>Select Area</InputLabel>
            <Select value={area} onChange={(e) => setArea(e.target.value)} required>
              <MenuItem value="">Select Area</MenuItem>
              {[...Array(24)].map((_, index) => (
                <MenuItem key={index} value={`Area ${index + 1}`}>
                  Area {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
        </Box>
        <TextField label="Topic" color="secondary" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="write your heading here"
          required
          fullWidth
          style={{ marginBottom: '30px' }}
        />
        <TextField label="Description" color="secondary" 
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
        <FormControl fullWidth style={{ marginBottom: '100px' }}>
          <InputLabel>Select Priority</InputLabel>
          <Select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <MenuItem value="">Select Priority</MenuItem>
            <MenuItem value="Low">
              <Avatar  variant="rounded" sx={{ backgroundColor: 'green' }}>L</Avatar> Low
            </MenuItem>
            <MenuItem value="Medium">
              <Avatar  variant="rounded"sx={{ backgroundColor: 'orange' }}>M</Avatar> Medium
            </MenuItem>
            <MenuItem value="High">
              <Avatar  variant="rounded"sx={{ backgroundColor: 'red' }}>H</Avatar> High
            </MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" sx={{ width: "200px", height: "50px", backgroundColor: "green", ml: "500px" }}>
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

export default FormPage;
