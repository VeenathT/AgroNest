import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import SignUp from '../pages/Thisaravi/SignUp';
import RegisterForm from '../pages/Thisaravi/RegisterForm';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/RegisterForm' element={<RegisterForm />}/>
    </Routes>
  );
}
export default Router;