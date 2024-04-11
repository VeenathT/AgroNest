// farmerInquiry.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InquiryRow from '../../Component/Veenath/InquiryRow';

const FarmerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('/api/reports');
        setInquiries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInquiries();
  }, []);

  return (
    <div>
      <h1>Farmer Inquiries</h1>
      <div>
        {inquiries.map((inquiry) => (
          <InquiryRow key={inquiry._id} inquiry={inquiry} />
        ))}
      </div>
    </div>
  );
}

export default FarmerInquiry;
