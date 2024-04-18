import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
import LabSignUp from '../pages/Oshini/signup';
import LabLogin from '../pages/Oshini/labLogin'
import LabDash from '../pages/Oshini/labDash';
import LabProfile from '../pages/Oshini/labProfile';
import LabEdit from '../pages/Oshini/labEdit';


const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/labSignup" element={<LabSignUp />} />
        <Route path="/labLogin" element={<LabLogin />} />
        <Route path="/labDash" element={<LabDash />} />
        <Route path="/labProfile" element={<LabProfile />} />
        <Route path="/labEdit" element={<LabEdit />} />

    </Routes>
  );
}
export default Router;