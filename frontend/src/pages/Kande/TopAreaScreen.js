import React from 'react';
import AddTopAreas from '../../Component/Kande/AddTopAreas';
import backgroundImage from '../../images/common/background.avif';
import '../../styles/Sudarshan/dealer_profile.css';

const TopAreas = () => {
  return (
    <div className="profile-page-container" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh'}}>
      <header />
      <div className="profile-page-content">
        <AddTopAreas />
      </div>
    </div>
  );
};

export default TopAreas;
