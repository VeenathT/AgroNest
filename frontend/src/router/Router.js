import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
//Rahul
import { BrowserRouter as  Link } from 'react-router-dom';
import FarmerList from '../../src/Component/Rahul/FarmerList';
import DealerList from '../../src/Component/Rahul/DealerList';
import AdminHome from '../../src/pages/Rahul/AdminHome';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />

        //Rahul
          <Route path="/viewdealers" exact Component={DealerList} />
          <Route path="/viewfarmers" exact Component={FarmerList} />
          <Route path="/" exact Component={AdminHome} />

    </Routes>
  );
}
export default Router;