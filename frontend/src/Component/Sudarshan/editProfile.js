import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';
import { Icon } from '@mui/material';

const DealerProfile = () => {
  const [dealerName, setDealerName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch dealer's name from backend
    // Example: const dealerName = fetchDealerName();
    setDealerName("Dealer's Name"); // Set the fetched name here
  }, []);

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
        <Typography variant="h4" style={{ textAlign: 'center' }}>Welcome, {dealerName}!</Typography>
        <Avatar alt="Dealer" src="" className="avatar" style={{ boxShadow: '0 0 10px green' }} />
        <div className="details-container"> 
          <div className="detail-item">
            
            <Typography variant="subtitle1" className="detail-title">Username:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">account_circle</Icon>Blitz</Typography>
          </div>
          <div className="detail-item">
          
            <Typography variant="subtitle1" className="detail-title">Name:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">person</Icon>Dealer's Name</Typography>
          </div>
          <div className="detail-item">
           
            <Typography variant="subtitle1" className="detail-title">Email:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">email</Icon>dealer@example.com</Typography>
          </div>
          <div className="detail-item">
           
            <Typography variant="subtitle1" className="detail-title">Contact:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">phone</Icon>113456789</Typography>
          </div>
          <div className="detail-item">
           
            <Typography variant="subtitle1" className="detail-title">Store Location:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">location_on</Icon>Malabe</Typography>
          </div>
          <div className="detail-item">
           
            <Typography variant="subtitle1" className="detail-title">Address:</Typography>
            <Typography variant="subtitle1" className="detail-content"><Icon className="icon">home</Icon>Malabe</Typography>
          </div>
         
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default DealerProfile;