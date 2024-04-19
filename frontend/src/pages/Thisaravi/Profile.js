import React from 'react';
import FarmerProfile from '../../Component/Thisaravi/FarmerProfile';
import Sidebar from '../../Component/Thisaravi/Sidebar';

const Profile = () => {
  return (
    <div className="profile-page-container">
      <header />
      <div className="profile-page-content">
        <Sidebar />
        <FarmerProfile />
      </div>
    </div>
  );
};

export default Profile;
