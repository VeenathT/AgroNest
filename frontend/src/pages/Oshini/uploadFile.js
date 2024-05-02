import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function UploadFile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('requestId');
  const [userName, setUserName] = useState('');

  // Fetch user name from session storage
  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Function to handle file upload
const handleFileUpload = async (file) => {
    try {
      // Make API call to upload file
      const formData = new FormData();
      formData.append('file', file);
      // Add any additional data needed for the request
      // Example: formData.append('requestId', requestId);
      const response = await axios.post('http://localhost:8070/uploadFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Handle success
      console.log('File uploaded successfully:', response.data);
      // Display alert
      window.alert('File uploaded successfully');
    } catch (error) {
      // Handle error
      console.error('Error uploading file:', error);
      // Display alert
      window.alert('Error');
    }
  };
  

  return (
    <div style={{ paddingTop: '70px' }}>
      <AppBar position="fixed" style={{ marginTop: "75px", backgroundColor: '#0F5132' }}>
      <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0, color: 'white' }}>
            Upload File
          </Typography>
          <Typography variant="body1" style={{ color: 'white', marginRight: '-1100px' }}>
            Hello {userName}
          </Typography>
          <Link to="/labProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
      {/* Add file upload component here */}
      <div style={{ padding: '20px' }}>
        {/* File input */}
        <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
        {/* Upload button */}
        <Button variant="contained" onClick={() => handleFileUpload()}>Upload</Button>

      </div>
    </div>
  );
}

export default UploadFile;
