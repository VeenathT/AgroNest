import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup';
import TopFertilizer from  '../pages/Kande/TopfertilizerScreen'
import AddTopSelling from  '../pages/Kande/TopSellingScreen'
import AddTopAreas from '../pages/Kande/TopAreaScreen';
import SysManagerDashboard from '../pages/Kande/SysManagerDashboard';
import ViewTopFertilizer from '../pages/Kande/ViewTopFertilizer';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />

        {/* Kande Routes */}
        <Route path='/addtopfertilizers' element={<TopFertilizer />} />
        <Route path='/viewtopfertilizers' element={<ViewTopFertilizer />} />

        <Route path='/addtopsellingfertilizers' element={<AddTopSelling />} />
        <Route path='/addtopareas' element={<AddTopAreas />} />
        <Route path='/managerdashboard' element={<SysManagerDashboard />} />




    </Routes>
  );
}
export default Router;
