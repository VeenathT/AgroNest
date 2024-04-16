// inquiryCategory.js

import React from 'react';
import { Link } from 'react-router-dom';

const InquiryCategory = () => {
  return (
    <div>
      <h1>Select Category</h1>
      <div>
        <Link to="/formPage?category=Farmer">
          <button>Farmer</button>
        </Link>
        <Link to="/formPage?category=Dealer">
          <button>Dealer</button>
        </Link>
      </div>
    </div>
  );
}

export default InquiryCategory;