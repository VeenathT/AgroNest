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
  const inquiryId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchInquiryDetails = async () => {
      try {
        if (inquiryId) {
          const response = await axios.get(`http://localhost:8070/api/reports/${inquiryId}`);
          const { name, topic, description, priority, area } = response.data;
          setName(name);
          setTopic(topic);
          setDescription(description);
          setPriority(priority);
          setArea(area);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiryDetails();
  }, [location.search, inquiryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (inquiryId) {
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
      } else {
        await axios.post('http://localhost:8070/api/reports', {
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
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{inquiryId ? 'Update Inquiry' : 'Submit Inquiry'}</h1>
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
        <select value={area} onChange={(e) => setArea(e.target.value)} required>
          <option value="">Select Area</option>
          <option value="Area 1">Area 1</option>
          <option value="Area 2">Area 2</option>
          <option value="Area 3">Area 3</option>
          <option value="Area 4">Area 4</option>
          <option value="Area 5">Area 5</option>
          <option value="Area 6">Area 6</option>
          <option value="Area 7">Area 7</option>
          <option value="Area 8">Area 8</option>
          <option value="Area 9">Area 9</option>
          <option value="Area 10">Area 10</option>
          <option value="Area 11">Area 11</option>
          <option value="Area 12">Area 12</option>
          <option value="Area 13">Area 13</option>
          <option value="Area 14">Area 14</option>
          <option value="Area 15">Area 15</option>
          <option value="Area 16">Area 16</option>
          <option value="Area 17">Area 17</option>
          <option value="Area 18">Area 18</option>
          <option value="Area 19">Area 19</option>
          <option value="Area 20">Area 20</option>
          <option value="Area 21">Area 21</option>
          <option value="Area 22">Area 22</option>
          <option value="Area 23">Area 23</option>
          <option value="Area 24">Area 24</option>
        </select>
        <button type="submit">Send</button>
      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
}

export default FormPage;