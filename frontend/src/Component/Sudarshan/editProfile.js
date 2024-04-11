import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import '../../styles/Sudarshan/edit_profile.css';
import { Icon } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

const EditProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [dealerData, setDealerData] = useState({});
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [storeLocation, setStoreLocation] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch dealer's data from backend
    const fetchDealerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8070/dealer/dealers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        setDealerData(data);
        setUsername(data.username || '');
        setName(data.name || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setStoreLocation(data.storeLocation || '');
        setAddress(data.address || '');
        setImage(data.image || null);
        setPassword(data.password || '');
        setReEnteredPassword(data.reEnteredPassword || '');
      } catch (error) {
        console.error('Error fetching dealer data:', error);
      }
    };

    fetchDealerData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const MAX_FILE_SIZE_MB = 2;

  const handleChooseFile = async (event) => {
    const files = event.target.files;
    const file = files[0]; // Access the selected file
  
    if (file) {
      console.log('Selected File:', file);
      // Check file size
      const fileSizeInMB = file.size / (1024 * 1024); // Convert bytes to MB
      if (fileSizeInMB > MAX_FILE_SIZE_MB) {
        console.error('File size exceeds the maximum allowed size.');
        // You can display an error message to the user if needed
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        console.error('Invalid file type. Please select a JPG, JPEG, or PNG image.');
        // You can display an error message to the user if needed
        return;
      }
  
      // Convert file to Blob
      const blob = new Blob([file]);
  
      // Read the Blob and convert it to a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setImage({
          data: reader.result,
          contentType: file.type
        });
      };
      reader.readAsDataURL(blob);
    }
  };
  

  const handleUpdateProfile = async () => {
    try {
      console.log('Password:', password);
      console.log('Re-entered Password:', reEnteredPassword);
      console.log('Updating Profile...');
      console.log('Profile Data:', {
        username,
        name,
        email,
        phone,
        storeLocation,
        address,
        password,
        reEnteredPassword,
        image // Check if the image state is correctly populated
      });
      // Check if the password and re-entered password match
      if (password !== reEnteredPassword) {
        console.error("Passwords do not match");
        // You can display an error message to the user if needed
        return;
      }
  
      // Prepare updated details object
      const updatedDetails = {
        id: dealerData._id,
        username,
        name,
        email,
        phone,
        storeLocation,
        address,
        password,
        reEnteredPassword,
        image // Include re-entered password in the request body
      };
  
      // Send update request to backend
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8070/dealer/updateDealer/${dealerData._id}`, updatedDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Update successful');
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

   const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8070/dealer/delete/${dealerData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Profile deleted successfully');
      // Clear any authentication tokens and redirect to the landing page
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      navigate('/signup');
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };
  
  

  return (
    <div className="container"> 
      <div className="header"> 
        <IconButton onClick={toggleSidebar} edge="start" className="sidebar-button"> 
          <MenuIcon />
        </IconButton>
      </div>
      <div className="profile-container">
        <Typography variant="h4" style={{ textAlign: 'center' }}>Here you can edit your details, {dealerData?.name || 'User'}!</Typography>
        <Avatar
  alt="Dealer"
  src={image ? image.data : ''}
  className="avatar"
  style={{ boxShadow: '0 0 10px green' }}
/>
        <div style={{ marginTop: '20px', display: 'inline-block' }}></div>
        <Button variant="contained" color="primary" startIcon={<CloudUploadIcon />} style={{ borderRadius: '20px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }} className="edit-button" onClick={() => document.getElementById('fileInput').click()} >
            Choose Image
          </Button>
          <input type="file" id="fileInput" style={{ display: 'none' }} accept=".jpg, .jpeg" onChange={handleChooseFile} />
        <div className="details-container"> 
          
          <div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Username:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setUsername(e.target.value)}
    placeholder={dealerData.username || 'Username'}
  />
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Name:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setName(e.target.value)}
    placeholder={dealerData.name || 'Name'}
  />
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Email:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setEmail(e.target.value)}
    placeholder={dealerData.email || 'Email'}
  />
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Contact:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setPhone(e.target.value)}
    placeholder={dealerData.phone || 'Contact'}
  />
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Store Location:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setStoreLocation(e.target.value)}
    placeholder={dealerData.storeLocation || 'Store Location'}
  />
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Address:</Typography>
  <input
    type="text"
    className="detail-content"
    onChange={(e) => setAddress(e.target.value)}
    placeholder={dealerData.address || 'Address'}
  />
</div>
<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Password:</Typography>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      className="detail-content"
      onChange={(e) => setPassword(e.target.value)}
      placeholder={dealerData.reEnteredPassword || 'Password'}
    />
    <IconButton onClick={togglePasswordVisibility}>
      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  </div>
</div>

<div className="detail-item">
  <Typography variant="subtitle1" className="detail-title">Re-enter Password:</Typography>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <input
      type={showPassword ? 'text' : 'password'}
      className="detail-content"
      onChange={(e) => setReEnteredPassword(e.target.value)}
      placeholder={dealerData.reEnteredPassword || 'Re-enter Password'}
    />
    <IconButton onClick={togglePasswordVisibility}>
      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
    </IconButton>
  </div>
</div>
        </div>
        <div className="button-container">
          <Button variant="contained" color="success" startIcon={<UpdateIcon />} style={{ marginRight: '10px',borderRadius: '20px', fontSize: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }} className="edit-button" onClick={handleUpdateProfile}>
            Edit Profile
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} style={{ marginLeft: '10px',borderRadius: '20px', fontSize: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }} className="delete-button" onClick={handleDeleteProfile}>
            Delete Profile
          </Button>
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name || ''} />
    </div>
  );
};

export default EditProfile;
