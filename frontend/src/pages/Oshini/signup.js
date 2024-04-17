import React from 'react';
import signupForm from '../../Component/Oshini/signupForm';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Oshini/signupForm.css';

const SignupPage = () => {
  return (
    <div className="signup-page-container">
      <header />
      <div className="signup-page-content">
        <signupForm />
      </div>
    </div>
  );
};


export default SignupPage;
