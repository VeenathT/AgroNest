import React, { useState,useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import LandingPage from '../pages/common/LandingPage';
import LoginPage from '../pages/Sudarshan/DealerLogin';
import SignupPage from '../pages/Sudarshan/DealerSignUp';
import Header from '../Component/common/header';
import EditProfile from '../pages/Sudarshan/editProf';
import ManageShop from '../pages/Sudarshan/ManageShop';
import Feedbacks from '../pages/Sudarshan/Feedbacks';
import Inquiries from '../pages/Sudarshan/Inquries';
import Orders from '../pages/Sudarshan/Orders';
import LoginType from '../pages/common/LoginType';
import SignupType from '../pages/common/SignUpType';
import ProfType from '../pages/common/ProfileType';
import TopFertilizer from  '../pages/Kande/TopfertilizerScreen'
import AddTopSelling from  '../pages/Kande/TopSellingScreen'
import AddTopAreas from '../pages/Kande/TopAreaScreen';
import SysManagerDashboard from '../pages/Kande/SysManagerDashboard';
import ViewTopFertilizer from '../pages/Kande/ViewTopFertilizer';
import Login from '../Component/Kande/login/Login';


const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={<LandingPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/loginDealer"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signupDealer"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profileDealer"
          element={<DealerProf isLoggedIn={isLoggedIn} />}
        />
        <Route path="/editProf" element={<EditProfile />} />
        <Route path="/manageShop" element={<ManageShop />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/logintype" element={<LoginType />} />
        <Route path="/signuptype" element={<SignupType />} />
        <Route path="/profiletype" element={<ProfType />} />

        {/* Kande Routes */}
        <Route path='/addtopfertilizers' element={<TopFertilizer />} />
        <Route path='/viewtopfertilizers' element={<ViewTopFertilizer />} />
        <Route path='/addtopsellingfertilizers' element={<AddTopSelling />} />
        <Route path='/addtopareas' element={<AddTopAreas />} />
        <Route path='/managerdashboard' element={<SysManagerDashboard />} />
        <Route path='/Login' element={<Login />} />
        

      </Routes>
    </>
  );
};

export default Router;