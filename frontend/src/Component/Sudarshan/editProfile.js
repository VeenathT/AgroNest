import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';
import { Icon } from '@mui/material';
import { useLocation } from 'react-router-dom';

const EditProfile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { dealerData } = location.state || {};
  const dealerName = dealerData?.name || '';

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
        <Avatar alt="Dealer" src="" className="avatar" style={{ boxShadow: '0 0 10px green' }} />
        <div className="details-container"> 
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Username:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">account_circle</Icon>{dealerData?.username || 'N/A'}</Typography>
          </div>
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Name:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">person</Icon>{dealerData?.name || 'N/A'}</Typography>
          </div>
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Email:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">email</Icon>{dealerData?.email || 'N/A'}</Typography>
          </div>
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Contact:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">phone</Icon>{dealerData?.phone || 'N/A'}</Typography>
          </div>
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Store Location:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">location_on</Icon>{dealerData?.storeLocation || 'N/A'}</Typography>
          </div>
          <div className="detail-item">
            <Typography variant="subtitle1" className="detail-title">Address:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">home</Icon>{dealerData?.address || 'N/A'}</Typography>
          </div>
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerName} />
    </div>
  );
};

export default EditProfile;
