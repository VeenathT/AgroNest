// formPage.js

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const FormPage = () => {
  const history = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(location.search.split('=')[1]);
  const [area, setArea] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reports', {
        name,
        topic,
        description,
        priority,
        category,
        area
      });
      setSuccessMessage('Inquiry submitted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        history.push('/');
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Submit Inquiry</h1>
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
