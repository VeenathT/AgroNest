import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers';
import Sidebar from '../../../Component/Thisaravi/Sidebar';
import { useNavigate } from 'react-router-dom';

const districts = {
  Puttlam: ['Wennappuwa', 'Katuneriya', 'Chilaw'],
  Kurunagala: ['City8', 'City9', 'City0'],
  Colombo: ['Nugegoda', 'Maharagama', 'Pannipitiya'],
  Gampaha: ['City3', 'City4', 'City5'],
};

const soilTestTypes = [
  'Mineral Content',
  'pH Level',
  'Soil Moisture',
  'Salinity',
  'Pesticides and Chemical Contamination',
  'Structure and Texture',
];

const SoilTestRequest = () => {
  const [soilTestType, setSoilTestType] = useState('');
  const [cropType, setCropType] = useState('');
  const [date, setDate] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [availableLaboratories, setAvailableLaboratories] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLaboratories = async () => {
      if (district && city) {
        try {
          const response = await fetch(`http://localhost:8070/SoilTest/laboratories/${district}/${city}`);
          const data = await response.json();
          setAvailableLaboratories(data);
        } catch (error) {
          console.error('Error fetching laboratories:', error);
        }
      }
    };

    fetchLaboratories();
  }, [district, city]);

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDistrictChange = (event) => {
    const selectedDistrict = event.target.value;
    setDistrict(selectedDistrict);
    setCity('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    try {
      const response = await fetch('http://localhost:8070/SoilTest/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          soilTestType,
          cropType,
          date,
          district,
          city,
          laboratory,
        }),

      });
  
      if (!response.ok) {
        throw new Error('Failed to submit form data');
      }

    setSoilTestType('');
    setCropType('');
    setDate('');
    setDistrict('');
    setCity('');
    setLaboratory('');
    setAvailableLaboratories([]);

    console.log('Form data submitted successfully');
    navigate('/pending-requests');
  } catch (error) {
    console.error('Error submitting form data:', error);
  }
  };

  return (
    <div>
        <Sidebar />
    <Box maxWidth="500px" margin="10rem auto" bgcolor="white" padding="2rem" borderRadius="10px" boxShadow="0 0 10px rgba(0, 0, 0, 0.1)">
      <form onSubmit={handleSubmit}>
        <h2>Soil Test Request</h2>
        <FormControl fullWidth>
          <InputLabel>Soil Test Type</InputLabel>
          <Select value={soilTestType} onChange={(e) => setSoilTestType(e.target.value)} fullWidth sx={{ marginBottom: '1.5rem' }}>
            {soilTestTypes.map((test, index) => (
              <MenuItem key={index} value={test}>
                {test}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Crop Type"
          value={cropType}
          onChange={(e) => setCropType(e.target.value)}
          fullWidth
          sx={{ marginBottom: '1.5rem' }}
        />
        <TextField
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }} // Ensure the label doesn't overlap when the input is filled
        inputProps={{ min: new Date().toISOString().split('T')[0] }} // Set min attribute to prevent selection of past dates
        sx={{ marginBottom: '1.5rem' }}
        />
        {showCalendar && (
          <LocalizationProvider>
            <DateTimePicker value={date} onChange={(newDate) => setDate(newDate)} minDate={new Date()} />
          </LocalizationProvider>
        )}
      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
        <InputLabel>District</InputLabel>
        <Select value={district} onChange={handleDistrictChange} fullWidth>
          {Object.keys(districts).map((districtName, index) => (
            <MenuItem key={index} value={districtName}>
              {districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
        <InputLabel>City</InputLabel>
        <Select value={city} onChange={(e) => setCity(e.target.value)} fullWidth>
          {district && districts[district].map((cityName, index) => (
            <MenuItem key={index} value={cityName}>
              {cityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
          <InputLabel>Laboratory</InputLabel>
          <Select value={laboratory} onChange={(e) => setLaboratory(e.target.value)} fullWidth>
            {availableLaboratories.map((lab) => (
              <MenuItem key={lab._id} value={lab._id}>
                {lab.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ marginBottom: '1.5rem' }}>
        Submit
      </Button>
    </form>
    </Box>
    </div>
  );
};

export default SoilTestRequest;
