import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
import InquiryCategory from '../pages/Veenath/inquiryCategory';
import FormPage from '../pages/Veenath/formPage';
import FarmerInquiry from '../pages/Veenath/farmerInquiry';
import DealerInquiry from '../pages/Veenath/dealerInquiry';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/inquiryCategory" element={<InquiryCategory />} />
      <Route path="/farmerInquiry" element={<FarmerInquiry />} />
      <Route path="/dealerInquiry" element={<DealerInquiry />} />
      <Route path="/formPage" element={<FormPage />} />
    </Routes>
  );
}
export default Router;