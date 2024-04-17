import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InquiryRow from '../../Component/Veenath/InquiryRow';
import InquiryDetailsPopup from '../../Component/Veenath/InquiryDetailsPopup';

const FarmerInquiry = () => {
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedFarmerInquiries, setResolvedFarmerInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setSelectedInquiry(null);
    setIsPopupOpen(false);
  };

  return (
    <div>
      <h1>Farmer Inquiries</h1>
      <div>
        <h2>Pending Inquiries</h2>
        {pendingInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <div>Topic: {inquiry.topic}</div>
            <button onClick={() => handleViewInquiry(inquiry)}>View</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Resolved Inquiries</h2>
        {resolvedFarmerInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <div>Topic: {inquiry.topic}</div>
            <button onClick={() => handleViewInquiry(inquiry)}>View</button>
          </div>
        ))}
      </div>
      {isPopupOpen && (
        <div className="popup-background">
          <div className="popup">
            <InquiryDetailsPopup inquiry={selectedInquiry} onClosePopup={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default FarmerInquiry;
