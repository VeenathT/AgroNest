import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InquiryRow from '../../Component/Veenath/InquiryRow';
import { Link } from 'react-router-dom';

const FarmerInquiry = () => {
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedFarmerInquiries, setResolvedFarmerInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        const allInquiries = response.data;
        const farmerPendingInquiries = allInquiries.filter(inquiry => inquiry.status === 'Pending' && inquiry.category === 'Farmer');
        const farmerResolvedInquiries = allInquiries.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Farmer');
        setPendingInquiries(farmerPendingInquiries);
        setResolvedFarmerInquiries(farmerResolvedInquiries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/reports/${id}`);
      setPendingInquiries(pendingInquiries.filter(inquiry => inquiry._id !== id));
      setResolvedFarmerInquiries(resolvedFarmerInquiries.filter(inquiry => inquiry._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Farmer Inquiries</h1>
      <div>
        <h2>Pending Inquiries</h2>
        {pendingInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <InquiryRow inquiry={inquiry} />
            <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
            <Link to={`/formPage?id=${inquiry._id}`}>
              <button>Update</button>
            </Link>
          </div>
        ))}
      </div>
      <div>
        <h2>Resolved Inquiries</h2>
        {resolvedFarmerInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <InquiryRow inquiry={inquiry} />
            <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FarmerInquiry;
