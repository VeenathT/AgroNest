import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import SignUp from '../pages/Thisaravi/SignUp';
import RegisterForm from '../pages/Thisaravi/RegisterForm';
import Profile from '../pages/Thisaravi/Profile';
import FarmerProfile from '../Component/Thisaravi/FarmerProfile';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/RegisterForm' element={<RegisterForm />}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path="/farmer/:farmerID" element={<FarmerProfile />}/>
    </Routes>
  );
}
export default Router;