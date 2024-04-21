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
import Orders from '../pages/Sudarshan/Orders';
import LoginType from '../pages/common/LoginType';
import SignupType from '../pages/common/SignUpType';
import ProfType from '../pages/common/ProfileType';
import InquiryCategory from '../pages/Veenath/InquiryPages/inquiryCategory';
import FormPage from '../pages/Veenath/InquiryPages/formPage';
import FarmerInquiry from '../pages/Veenath/InquiryPages/farmerInquiry';
import DealerInquiry from '../pages/Veenath/InquiryPages/dealerInquiry';

import Signup from '../Component/Thisaravi/Signup'
import LabSignUp from '../pages/Oshini/signup';
import LabLogin from '../pages/Oshini/labLogin'
import LabDash from '../pages/Oshini/labDash';
import LabProfile from '../pages/Oshini/labProfile';
import LabEdit from '../pages/Oshini/labEdit';
import TestAccept from '../pages/Oshini/accepted';
import TestComplete from '../pages/Oshini/completed';


const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }else {
      setIsLoggedIn(false); 
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
        <Route path="/orders" element={<Orders />} />
        <Route path="/logintype" element={<LoginType />} />
        <Route path="/signuptype" element={<SignupType />} />
        <Route path="/profiletype" element={<ProfType />} />
        <Route path="/inquiryCategory" element={<InquiryCategory />} />
        <Route path="/farmerInquiry" element={<FarmerInquiry />} />
        <Route path="/dealerInquiry" element={<DealerInquiry />} />
        <Route path="/formPage" element={<FormPage />} />
      </Routes>
    </>
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/labSignup" element={<LabSignUp />} />
        <Route path="/labLogin" element={<LabLogin />} />
        <Route path="/labDash" element={<LabDash />} />
        <Route path="/labProfile" element={<LabProfile />} />
        <Route path="/labEdit" element={<LabEdit />} />
        <Route path="/accepted" element={<TestAccept />} />
        <Route path="/completed" element={<TestComplete />} />

    </Routes>
  );
};

export default Router;