import React, { useState } from 'react';
import DealerProfile from '../../Component/Sudarshan/DealerProfile';
import EditProfile from '../../Component/Sudarshan/EditProfile';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Sudarshan/dealer_profile.css';

const DealerProfilePage = () => {


  return (
    <div className="profile-page-container">
      <div className="profile-page-content">
        <DealerProfile />
      </div>
    </div>
  );
};

export default DealerProfilePage;
