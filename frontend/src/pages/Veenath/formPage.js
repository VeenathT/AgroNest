import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(location.search.split('=')[1]);
  const [area, setArea] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchInquiryDetails = async () => {
      try {
        const inquiryId = new URLSearchParams(location.search).get('id');
        const response = await axios.get(`http://localhost:8070/api/reports/${inquiryId}`);
        const { name, topic, description, priority, area } = response.data;
        setName(name);
        setTopic(topic);
        setDescription(description);
        setPriority(priority);
        setArea(area);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiryDetails();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const inquiryId = new URLSearchParams(location.search).get('id');
      await axios.put(`http://localhost:8070/api/reports/${inquiryId}`, {
        name,
        topic,
        description,
        priority,
        category,
        area
      });
      setSuccessMessage('Inquiry updated successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Update Inquiry</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Topic" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
          <option value="">Select Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input type="text" value={category} disabled />
        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" required />
        <button type="submit">Send</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default FormPage;
