// DealerProfile.js
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

  const renderDetailItem = (title, icon, content) => (
    <div className="detail-item">
      <Typography variant="subtitle1" className="detail-title">{title}</Typography>
      <Typography variant="subtitle1" className="detail-content">
        <Icon className="icon">{icon}</Icon>{content}
      </Typography>
    </div>
  );

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
          {renderDetailItem('Username:', 'account_circle', 'Blitz')}
          {renderDetailItem('Name:', 'person', "Dealer's Name")}
          {renderDetailItem('Email:', 'email', 'dealer@example.com')}
          {renderDetailItem('Contact:', 'phone', '113456789')}
          {renderDetailItem('Store Location:', 'location_on', 'Malabe')}
          {renderDetailItem('Address:', 'home', 'Malabe')}
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
    </div>
  );
};

export default DealerProfile;
