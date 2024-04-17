import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
import LabSignUp from '../pages/Oshini/signup';
import LabLogin from '../pages/Oshini/labLogin'
import LabDash from '../pages/Oshini/labDash';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/labSignup" element={<LabSignUp />} />
        <Route path="/labLogin" element={<LabLogin />} />
        <Route path="/labDash" element={<LabDash />} />
    </Routes>
  );
}
export default Router;