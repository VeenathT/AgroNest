import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InquiryRow from '../../Component/Veenath/InquiryRow';
import InquiryDetailsPopup from '../../Component/Veenath/InquiryDetailsPopup'; // Assuming you have created this component for the popup

const DealerInquiry = () => {
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedDealerInquiries, setResolvedDealerInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        const allInquiries = response.data;
        const dealerPendingInquiries = allInquiries.filter(inquiry => inquiry.status === 'Pending' && inquiry.category === 'Dealer');
        const dealerResolvedInquiries = allInquiries.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Dealer');
        setPendingInquiries(dealerPendingInquiries);
        setResolvedDealerInquiries(dealerResolvedInquiries);
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
      <h1>Dealer Inquiries</h1>
      <div>
        <h2>Pending Inquiries</h2>
        {pendingInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <div>
              <div>Topic: {inquiry.topic}</div>
              <button onClick={() => handleViewInquiry(inquiry)}>View</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>Resolved Inquiries</h2>
        {resolvedDealerInquiries.map((inquiry) => (
          <div key={inquiry._id}>
            <div>
              <div>Topic: {inquiry.topic}</div>
              <button onClick={() => handleViewInquiry(inquiry)}>View</button>
            </div>
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

export default DealerInquiry;