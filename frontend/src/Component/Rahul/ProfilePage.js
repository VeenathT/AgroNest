import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';
import { Icon } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState({
    username: 'Tharinda',
    email: 'tharindatheekshana1@gmail.com',
    city: 'Galle',
    phone: '0756353603',
    address: 'Renda watta,Baddegama.'
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Authorization Token:', token);
        const response = await axios.get('http://localhost:8070/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response from backend:', response.data);
        setAdminData(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchAdminData();
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
        <Typography variant="h4" style={{ textAlign: 'center', color: 'white' }}>Welcome, {adminData?.username}!</Typography>

        <div className="details-container" style={{ marginTop: '40px' }}>
          {renderDetailItem('Username:', 'account_circle', adminData?.username, 'white')}
          {renderDetailItem('Email:', 'email', adminData?.email, 'white')}
          {renderDetailItem('City:', 'location_city', adminData?.city, 'white')}
          {renderDetailItem('Phone:', 'phone', adminData?.phone, 'white')}
          {renderDetailItem('Address:', 'home', adminData?.address, 'white')}
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} adminName={adminData?.username} handleEditProfile={handleEditProfile} />
    </div>
  );
};

export default AdminProfile;
