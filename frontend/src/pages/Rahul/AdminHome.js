import React from 'react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/viewdealers">Dealers</Link>
        </li>
        <li>
          <Link to="/viewfarmers">Farmers</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminHome;
