import React from 'react';
import AddTopSelling from '../../Component/Kande/AddTopSelling';
import '../../styles/Sudarshan/dealer_profile.css';

const TopSelling = () => {
  return (
    <div className="profile-page-container">
      <header />
      <div className="profile-page-content">
        <AddTopSelling />
      </div>
    </div>
  );
};

export default TopSelling;
