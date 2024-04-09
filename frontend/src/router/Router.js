import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import LandingPage from '../pages/common/LandingPage';
import LoginPage from '../pages/Sudarshan/DealerLogin';
import SignupPage from '../pages/Sudarshan/DealerSignUp';
import Header from '../Component/common/header'; // Import the Header component

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    // Perform any logout logic here, e.g., clearing local storage, etc.
    setIsLoggedIn(false);
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} /> {/* Pass props to the Header component */}
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
      </Routes>
    </>
  );
};

export default Router;
