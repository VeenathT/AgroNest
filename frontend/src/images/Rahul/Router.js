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

//Rahul

import FarmerList from '../Component/Rahul/FarmerList';
import DealerList from '../Component/Rahul/DealerList';

import LabCards from '../Component/Rahul/LabCard';
import FullWidthTabs from '../Component/Rahul/FullWidthTabs';
import AdminLogin from '../Component/Rahul/AdminLogin';
import AdminDashboard from '../pages/Rahul/AdminDashboard'
import ReactTable from '../Component/Rahul/ReactTable'
import Slideshow from '../../src/Component/common/Slideshow';



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

  const images = [
    require('../images/Rahul/1.png'),
    require('../images/Rahul/2.png'),
    require('../images/Rahul/3.png')
  ];

  return (
    <>

    <div className="App">
      <h1>My Slideshow</h1>
      <Slideshow images={images} />
    </div>

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
        <Route path="/dealerInquiry" element={<DealerInquiry />} />3
        <Route path="/formPage" element={<FormPage />} />

        {/* Rahul */}
        <Route path="/viewdealers" element={<DealerList />} />
        <Route path="/viewfarmers" element={<FarmerList />} />
       
        <Route path="/userreports" element={<FullWidthTabs />} />
        <Route path="/labrotaryview" element={<LabCards />} />
        <Route path="/admin/login" element={<AdminLogin setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/admin/home' element={<AdminDashboard/>} />
        <Route path='/react' element={<ReactTable/>}/>
        <Route path='/slide' element={<Slideshow/>}/>

      </Routes>
    </>
  );
};

export default Router;