import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
import ItemView from '../Component/Lasindu/ItemView';
import OrderHistoryPage from '../Component/Lasindu/orderHistory';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/Item/:id" element={<ItemView />}/>
        <Route path="/Order-History" element={<OrderHistoryPage />}/>
    </Routes>
  );
}
export default Router;