import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SoilTestRequest = () => {
  const [formData, setFormData] = useState({
    soilTestType: '',
    cropType: '',
    areaOfCultivation: '',
    district: '',
    city: '',
    laboratory: '',
  });

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [laboratories, setLaboratories] = useState([]);

  useEffect(() => {
    // Fetch districts
    axios.get('http://localhost:8070/SoilTest/cities/:district')
      .then(response => {
        setDistricts(response.data);
      })
      .catch(error => {
        console.error('Error fetching districts:', error);
      });
  }, []);

  const handleDistrictChange = (district) => {
    setFormData({ ...formData, district });
    // Fetch cities based on selected district
    axios.get(`/api/soilTests/cities/${district}`)
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  };

  const handleCityChange = (city) => {
    setFormData({ ...formData, city });
    // Fetch laboratories based on selected district and city
    axios.get(`/api/soilTests/laboratories/${formData.district}/${city}`)
      .then(response => {
        setLaboratories(response.data);
      })
      .catch(error => {
        console.error('Error fetching laboratories:', error);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form data to backend
    axios.post('/api/soilTests/add', formData)
      .then(response => {
        console.log('Soil test request submitted successfully:', response.data);
        // Optionally, you can redirect or show a success message here
      })
      .catch(error => {
        console.error('Error submitting soil test request:', error);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div>
      <h2>Submit Soil Test Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Soil Test Type:</label>
          <input type="text" name="soilTestType" value={formData.soilTestType} onChange={handleChange} />
        </div>
        <div>
          <label>Crop Type:</label>
          <input type="text" name="cropType" value={formData.cropType} onChange={handleChange} />
        </div>
        <div>
          <label>Area of Cultivation:</label>
          <input type="number" name="areaOfCultivation" value={formData.areaOfCultivation} onChange={handleChange} />
        </div>
        <div>
          <label>District:</label>
          <select value={formData.district} onChange={(e) => handleDistrictChange(e.target.value)}>
            <option value="">Select District</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>
        <div>
          <label>City:</label>
          <select value={formData.city} onChange={(e) => handleCityChange(e.target.value)}>
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Laboratory:</label>
          <select name="laboratory" value={formData.laboratory} onChange={handleChange}>
            <option value="">Select Laboratory</option>
            {laboratories.map(lab => (
              <option key={lab._id} value={lab._id}>{lab.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SoilTestRequest;
