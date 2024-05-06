import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';
import { Icon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DealerRating from '../../pages/Veenath/FeedbackPages/DealerRating';

const DealerProfile = () => {
  const [dealerData, setDealerData] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchDealerData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Authorization Token:', token);
        const response = await axios.get('http://localhost:8070/dealer/dealers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response from backend:', response.data);
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
    navigate('/editProf');
  };

  const renderDetailItem = (title, icon, content, labelColor = 'white', detailsColor = 'black') => (
    <div className="detail-item">
      <Typography variant="subtitle1" className="detail-title" style={{ color: labelColor }}>{title}</Typography>
      <Typography variant="subtitle1" className="detail-content" style={{ color: detailsColor }}>
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
        <Typography variant="h4" style={{ textAlign: 'center', color:'white' }}>Welcome, {dealerData?.name}!</Typography>

        <DealerRating />

        <div className="details-container" style={{ marginTop: '40px' }}> 
          {renderDetailItem('Username:', 'account_circle', dealerData?.username, 'white')}
          {renderDetailItem('Name:', 'person', dealerData?.name, 'white')}
          {renderDetailItem('Email:', 'email', dealerData?.email, 'white')}
          {renderDetailItem('Contact:', 'phone', dealerData?.phone, 'white')}
          {renderDetailItem('Store Location:', 'location_on', dealerData?.storeLocation, 'white')}
          {renderDetailItem('Address:', 'home', dealerData?.address, 'white')}
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />
    </div>
  );
};

export default DealerProfile;
