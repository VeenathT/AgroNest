import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import '../../styles/Sudarshan/edit_profile.css';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import PopupMessage from '../../pages/common/PopUp';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

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
  const [password, setPassword] = useState('');
  const [reEnteredPassword, setReEnteredPassword] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    
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
        setPassword(data.password || '');
        setReEnteredPassword(data.reEnteredPassword || '');
      } catch (error) {
        console.error('Error fetching dealer data:', error);
        setErrorMessage(error.response.data.error);
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


  const handleUpdateProfile = async () => {
    try {

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      console.error('Invalid email format');
      setErrorMessage('Invalid email format');
      return;
    }

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
      });
      
      if (password !== reEnteredPassword) {
        console.error("Passwords do not match");
        
        return;
      }
  
      
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
      };
  
      
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8070/dealer/updateDealer/${dealerData._id}`, updatedDetails, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Update successful');
      setSuccessMessage('Details updated successfully');
      setTimeout(() => {
        navigate('/profileDealer');
      }, 2000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.response.data.error);
    }
  };


  const confirmDeleteProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8070/dealer/delete/${dealerData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Profile deleted successfully');
      
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      setSuccessMessage('Profile deleted successfully');
      setTimeout(() => {
        navigate('/signupDealer');
      }, 2000);
    } catch (error) {
      console.error('Error deleting profile:', error);
      setErrorMessage(error.response.data.error);
    }
  };

  
  const handleClosePopup = () => {
    
    setErrorMessage('');
    setSuccessMessage('');
  };

  return (
    <div className="container">

      <div className="header"> 
        <IconButton onClick={toggleSidebar} edge="start" className="sidebar-button"> 
          <MenuIcon />
        </IconButton>
      </div>

      <div className="profile-container">

        <Typography variant="h4" style={{ textAlign: 'center', color:'white' }}>Here you can edit your details, {dealerData?.name || 'User'}!</Typography>

        <div style={{ marginTop: '20px', display: 'inline-block' }}></div>


        <div className="details-container" style={{ marginTop: '40px' }}>

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
              <IconButton onClick={togglePasswordVisibility} style={{ color: 'white' }}>
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
              <IconButton onClick={togglePasswordVisibility} style={{ color: 'white' }}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </div>
          </div>
        </div>

        <div className="button-container">
          <Button variant="contained" color="success" startIcon={<UpdateIcon />} style={{ marginRight: '10px', borderRadius: '20px', fontSize: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }} className="edit-button" onClick={handleUpdateProfile}>
            Edit Profile
          </Button>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} style={{ marginLeft: '10px', borderRadius: '20px', fontSize: '16px', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.4)' }} className="delete-button" onClick={() => setShowConfirmationDialog(true)}>
            Delete Profile
          </Button>
        </div>
      </div>

      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name || ''} />
      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}

      <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <DialogTitle>Are you sure you want to delete your profile?</DialogTitle>
        <DialogActions>
          <Button onClick={confirmDeleteProfile} color="error">Yes</Button>
          <Button onClick={() => setShowConfirmationDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default EditProfile;
