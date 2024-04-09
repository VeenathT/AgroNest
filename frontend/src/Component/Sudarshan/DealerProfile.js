import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';
import { Icon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DealerProfile = () => {
  const [dealerData, setDealerData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
        setDealerData(response.data);
      } catch (error) {
        console.error('Error fetching dealer data:', error);
      }
    };

    fetchDealerData();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditProfile = () => {
    navigate('/editProf', { state: { dealerData } });
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
        <Typography variant="h4" style={{ textAlign: 'center' }}>Welcome, {dealerData?.name}!</Typography>
        <Avatar alt="Dealer" src="" className="avatar" style={{ boxShadow: '0 0 10px green' }} />
        <div className="details-container"> 
          {renderDetailItem('Username:', 'account_circle', dealerData?.username)}
          {renderDetailItem('Name:', 'person', dealerData?.name)}
          {renderDetailItem('Email:', 'email', dealerData?.email)}
          {renderDetailItem('Contact:', 'phone', dealerData?.phone)}
          {renderDetailItem('Store Location:', 'location_on', dealerData?.storeLocation)}
          {renderDetailItem('Address:', 'home', dealerData?.address)}
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />
    </div>
  );
};

export default DealerProfile;
