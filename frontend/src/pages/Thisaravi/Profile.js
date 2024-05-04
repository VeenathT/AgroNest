import React from 'react';
import FarmerProfile from '../../Component/Thisaravi/FarmerProfile';
import Sidebar from '../../Component/Thisaravi/Sidebar';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { farmerID } = useParams();

  return (
    <div className="profile-page-container">
      <header />
      <div className="profile-page-content">
        <Sidebar farmerID={farmerID} />
        <FarmerProfile />
      </div>
    </div>
  );
};

export default Profile;
