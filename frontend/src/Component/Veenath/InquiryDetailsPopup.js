import React from 'react';
import axios from 'axios';

const InquiryDetailsPopup = ({ inquiry, onClosePopup }) => {

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/reports/${id}`);
      onClosePopup(); // Close the popup after deleting the inquiry
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Inquiry Details</h2>
      <div>Name: {inquiry.name}</div>
      <div>Topic: {inquiry.topic}</div>
      <div>Description: {inquiry.description}</div>
      <div>Priority: {inquiry.priority}</div>
      <div>Area: {inquiry.area}</div>
      <button onClick={() => handleDelete(inquiry._id)}>Delete</button>
      <a href={`/formPage?id=${inquiry._id}`}><button>Update</button></a>
      <button onClick={onClosePopup}>Close</button>
    </div>
  );
}

export default InquiryDetailsPopup;
