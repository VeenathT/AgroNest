import React, { useState,useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import LandingPage from '../pages/common/LandingPage';
import LoginPage from '../pages/Sudarshan/DealerLogin';
import SignupPage from '../pages/Sudarshan/DealerSignUp';
import Header from '../Component/common/header';
import EditProfile from '../pages/Sudarshan/EditProf';
import ManageShop from '../pages/Sudarshan/ManageShop';
import Feedbacks from '../pages/Sudarshan/Feedbacks';
import Inquiries from '../pages/Sudarshan/Inquries';
import Orders from '../pages/Sudarshan/Orders';

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
    localStorage.removeItem('token'); // Clear any authentication tokens
    setIsLoggedIn(false); // Update isLoggedIn state to false
    navigate('/'); // Redirect to the landing page
  };

  return (
    <>
      {isLoggedIn && <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />}  {/* Pass props to the Header component */}
      <Routes>
        <Route
          path="/"
          element={<LandingPage isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={<DealerProf isLoggedIn={isLoggedIn} />}
        />
        <Route path="/editProf" element={<EditProfile />} />
        <Route path="/manageShop" element={<ManageShop />} />
        <Route path="/feedbacks" element={<Feedbacks />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
};

export default Router;
