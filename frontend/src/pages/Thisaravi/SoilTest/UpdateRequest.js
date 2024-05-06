import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import axios from 'axios';

const districts = {
  Puttlam: ['Wennappuwa', 'Katuneriya', 'City7'],
  Kurunagala: ['City8', 'City9', 'City0'],
  Colombo: ['City1', 'City2', 'City3'],
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

const UpdateRequest = () => {
  const { requestId } = useParams();
  const history = useNavigate();

  const [soilTestType, setSoilTestType] = useState('');
  const [cropType, setCropType] = useState('');
  const [date, setDate] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [laboratory, setLaboratory] = useState('');
  const [availableLaboratories, setAvailableLaboratories] = useState([]);

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

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/SoilTest/get/${requestId}`);
        const requestData = response.data;
        setSoilTestType(requestData.soilTestType);
        setCropType(requestData.cropType);
        setDate(new Date(requestData.date).toISOString().split('T')[0]);
        setDistrict(requestData.district);
        setCity(requestData.city);
        setLaboratory(requestData.laboratory);
      } catch (error) {
        console.error('Error fetching request details:', error);
      }
    };

    fetchRequestDetails();
  }, [requestId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8070/SoilTest/update/${requestId}`, {
        soilTestType,
        cropType,
        date,
        district,
        city,
        laboratory
      });
      history('/pending-requests'); // Redirect to view requests page after updating
    } catch (error) {
      console.error('Error updating soil test request:', error);
    }
  };

  return (
    <div>
        <Box maxWidth="500px" margin="10rem auto" bgcolor="white" padding="2rem" borderRadius="10px" boxShadow="0 0 10px rgba(0, 0, 0, 0.1)">
      <h2>Update Soil Test Request</h2>
      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
          <InputLabel>Soil Test Type</InputLabel>
          <Select value={soilTestType} onChange={(e) => setSoilTestType(e.target.value)} fullWidth>
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
        sx={{ marginBottom: '1.5rem' }}
        inputProps={{ min: new Date().toISOString().split('T')[0] }}
      />

      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }}>
        <InputLabel>District</InputLabel>
        <Select value={district} onChange={(e) => setDistrict(e.target.value)} fullWidth>
          {Object.keys(districts).map((districtName, index) => (
            <MenuItem key={index} value={districtName}>
              {districtName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '1.5rem' }} >
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
          {availableLaboratories.map((lab, index) => (
            <MenuItem key={index} value={lab._id}>
              {lab.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl >
      <Button variant="contained" color="primary" onClick={handleUpdate} >
        Update
      </Button>
      </Box>
    </div>
  );
};

export default UpdateRequest;
