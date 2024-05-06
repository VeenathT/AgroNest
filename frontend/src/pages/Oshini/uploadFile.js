import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, IconButton, styled } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

const Container = styled('div')({
  width: '100%',
  maxWidth: 700,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'calc(100vh - 150px)',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  position: 'fixed',
  top: '75px', 
  left: '50%',
  transform: 'translateX(-50%)',
});

const InsideContainer = styled('div')({
  border: '1px solid black',
  borderRadius: '10px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
});

const DropArea = styled('div')({
  border: '1px dashed #0F5132',
  borderRadius: '5px',
  padding: '20px',
  marginTop: '20px',
  backgroundColor: 'transparent',
  textAlign: 'center',
  cursor: 'pointer',
});

function UploadFile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const requestId = searchParams.get('requestId');
  const [userName, setUserName] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [removingFile, setRemovingFile] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);
    formData.append('requestId', requestId);

    try {
      await axios.post('http://localhost:8070/labReport/upload-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert("Successfully uploaded");
      navigate('/completed');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert("An error occurred while uploading. Please try again later.");
    }
  };

  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileClick = () => {
    if (file && !removingFile) {
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const removeFile = () => {
    setRemovingFile(true); 
    setFile(null);
    setRemovingFile(false); 
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <AppBar position="fixed" style={{ marginTop: '108px', backgroundColor: '#0F5132' }}>
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
      <Container style={{ marginTop: '80px' }}>
        <InsideContainer>
          <div style={{ padding: '20px' }}>
            <form onSubmit={handleFileUpload}>
              <center>
                <h2>Upload Lab Report here</h2>
              </center>
              <TextField
                variant="outlined"
                placeholder="Title"
                required
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <br />
              <DropArea
                onClick={handleFileClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ border: dragging ? '2px dashed #0F5132' : '1px dashed #0F5132' }}
              >
                {file ? (
                  <>
                    <Typography variant="body2" gutterBottom>
                      Selected: {file.name}
                    </Typography>
                    <Button variant="outlined" onClick={removeFile}>Remove</Button>
                  </>
                ) : (
                  <Typography variant="body2" gutterBottom>
                    Click to view or Drag & Drop
                  </Typography>
                )}
              </DropArea>
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
              <center>
                <Button variant="contained" component="label" style={{ marginTop: '10px', backgroundColor: '#0F5132', color: 'white' }}>
                  Browse
                  <input type="file" accept="application/pdf" onChange={handleFileChange} style={{ display: 'none' }} />
                </Button>
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#0F5132', borderRadius: '5px' }}
                >
                  Submit
                </Button>
              </center>
            </form>
          </div>
        </InsideContainer>
      </Container>
    </div>
  );
}

export default UploadFile;
