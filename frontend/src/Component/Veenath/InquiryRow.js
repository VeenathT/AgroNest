import React from 'react';
import { Link } from 'react-router-dom';

const InquiryRow = ({ inquiry }) => {
  return (
    <div>
      <div>Topic: {inquiry.topic}</div>
      <Link to={`/viewInquiry/${inquiry._id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}

export default InquiryRow;
