import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Component/Thisaravi/Signup';
import RegForm from './Component/Thisaravi/RegForm';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/RegForm" element={<RegForm/>} />
        </Routes>
      </header>
    </div>
    </Router>
  );
}

export default App;
