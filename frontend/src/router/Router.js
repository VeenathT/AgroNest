import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import SignUp from '../pages/Thisaravi/SignUp';
import RegisterForm from '../pages/Thisaravi/RegisterForm';
import Profile from '../pages/Thisaravi/Profile';
import FarmerProfile from '../Component/Thisaravi/FarmerProfile';
import Sidebar from '../Component/Thisaravi/Sidebar';
import SoilTestRequest from '../pages/Thisaravi/SoilTest/SoilTestRequest';
import TestServices from '../pages/Thisaravi/SoilTest/TestServices';
import ViewRequests from '../pages/Thisaravi/SoilTest/ViewRequests';
import RequestDetails from '../pages/Thisaravi/SoilTest/RequestDetails';
import UpdateRequest from '../pages/Thisaravi/SoilTest/UpdateRequest';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/RegisterForm' element={<RegisterForm />}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path="/farmer/:farmerID" element={<FarmerProfile />}/>
        <Route path='/Sidebar' element={<Sidebar/>}/>
        <Route path='/soil-test-request' element={<SoilTestRequest/>}/>
        <Route path='/soil-test' element={<TestServices/>}/>
        <Route path='/pending-requests' element={<ViewRequests/>}/>
        <Route path='/soil-test/:requestId' element={<RequestDetails/>}/>
        <Route path='/update-request/:requestId' element={<UpdateRequest/>}/>

    </Routes>
  );
}
export default Router;