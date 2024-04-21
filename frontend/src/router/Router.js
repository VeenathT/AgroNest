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

import RegisterForm from '../pages/Thisaravi/RegisterForm';
import Profile from '../pages/Thisaravi/Profile';
import FarmerProfile from '../Component/Thisaravi/FarmerProfile';
import Sidebar from '../Component/Thisaravi/Sidebar';
import SoilTestRequest from '../pages/Thisaravi/SoilTest/SoilTestRequest';
import TestServices from '../pages/Thisaravi/SoilTest/TestServices';
import ViewRequests from '../pages/Thisaravi/SoilTest/ViewRequests';
import RequestDetails from '../pages/Thisaravi/SoilTest/RequestDetails';
import UpdateRequest from '../pages/Thisaravi/SoilTest/UpdateRequest';
import Login from '../pages/Thisaravi/Login';
import TestType from '../pages/Thisaravi/SoilTest/TestType';

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

        <Route path='/RegisterForm' element={<RegisterForm />}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path="/farmer/:farmerID" element={<FarmerProfile />}/>
        <Route path='/Sidebar' element={<Sidebar/>}/>
        <Route path='/soil-test-request' element={<SoilTestRequest/>}/>
        <Route path='/soil-test' element={<TestServices/>}/>
        <Route path='/pending-requests' element={<ViewRequests/>}/>
        <Route path='/soil-test/:requestId' element={<RequestDetails/>}/>
        <Route path='/update-request/:requestId' element={<UpdateRequest/>}/>
        <Route path='/Login' element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
        <Route path='/test-types' element={<TestType />}/>
      </Routes>
    </>
  );
};

export default Router;