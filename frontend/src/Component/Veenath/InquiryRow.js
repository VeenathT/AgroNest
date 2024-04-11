// InquiryRow.js

import React from 'react';
import { Link } from 'react-router-dom';

const InquiryRow = ({ inquiry }) => {
  return (
    <div>
      <div>Name: {inquiry.name}</div>
      <div>Topic: {inquiry.topic}</div>
      <div>Description: {inquiry.description}</div>
      <div>Priority: {inquiry.priority}</div>
      <div>Area: {inquiry.area}</div>
      <Link to={`/viewInquiry/${inquiry._id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}

export default InquiryRow;
