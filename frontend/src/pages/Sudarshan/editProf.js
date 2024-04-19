import React from 'react';
import EditProfile from '../../Component/Sudarshan/editProfile';
import '../../styles/Sudarshan/dealer_profile.css';

const DealerProfilePage = () => {

  return (
    <div className="profile-page-container">
      <div className="profile-page-content">
        <EditProfile />
      </div>
    </div>
  );
};

export default DealerProfilePage;
