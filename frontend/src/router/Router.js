import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup';
// Rahul
import FarmerList from '../Component/Rahul/FarmerList';
import DealerList from '../Component/Rahul/DealerList';
import AdminHome from '../pages/Rahul/AdminHome';
import LabCards from '../Component/Rahul/LabCard';
import FullWidthTabs from '../Component/Rahul/FullWidthTabs';

const AppRouter = () => {
  return (
    <Router> {/* Wrap the Routes in BrowserRouter */}
      <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />

        {/* Rahul */}
        <Route path="/viewdealers" element={<DealerList />} />
        <Route path="/viewfarmers" element={<FarmerList />} />
        <Route path="/Admin" element={<AdminHome />} />
        <Route path="/userreports" element={<FullWidthTabs />} />
        <Route path="/labrotaryview" element={<LabCards />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
