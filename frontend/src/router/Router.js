import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DealerProf from '../pages/Sudarshan/DealerProf';
import Signup from '../Component/Thisaravi/Signup'
// import Articlespage from '../pages/Nilupul/articlespage';
import ArticleList from '../pages/Nilupul/ArticleList';
import ArticleForm from '../pages/Nilupul/ArticleForm';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Navigate to='/index' />} />
        <Route path="/DealerProf" element={<DealerProf />} />
        <Route path='/Signup' element={<Signup />} />
        {/* <Route path='/articlespage' element={<Articlespage/>} /> */}
        <Route path='/articles' element={<ArticleList/>} />
        <Route path='/addarticle' element={<ArticleForm/>} />

    </Routes>
  );
}
export default Router;