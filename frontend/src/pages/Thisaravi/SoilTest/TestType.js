import React, { useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const TestType = [
  {
    name: 'Mineral Content',
    description: 'This test determines the presence and concentration of essential minerals in the soil, such as nitrogen, phosphorus, potassium, calcium, and magnesium. These minerals are vital for plant growth and productivity. By analyzing mineral content, farmers can make informed decisions about fertilization and soil amendment strategies.',
  },
  {
    name: 'pH Level',
    description: 'Soil pH indicates its acidity or alkalinity. The pH scale ranges from 0 to 14, with 7 being neutral. Acidic soils (pH below 7) may require lime application to neutralize acidity, while alkaline soils (pH above 7) may need sulfur or other acidifying agents. pH level influences nutrient availability to plants and microbial activity in the soil.',
  },
  {
    name: 'Soil Moisture',
    description: 'Soil moisture testing measures the amount of water present in the soil. Proper moisture levels are crucial for plant growth, as both excess and insufficient moisture can lead to crop stress or failure. This test helps farmers optimize irrigation practices and conserve water resources.',
  },
  {
    name: 'Salinity',
    description: 'Salinity testing assesses the concentration of soluble salts in the soil. High salinity levels can inhibit plant growth by disrupting water uptake and causing toxicity to sensitive crops. Managing soil salinity involves proper drainage, irrigation management, and soil amendments to reduce salt accumulation.',
  },
  {
    name: 'Pesticides and Chemical Contamination',
    description: 'This test detects the presence of harmful pesticides, heavy metals, and other contaminants in the soil. Chemical contamination can pose risks to human health, ecosystems, and agricultural productivity. Regular monitoring and remediation efforts are essential for maintaining soil quality and safety.',
  },
  {
    name: 'Structure and Texture',
    description: 'Soil structure refers to the arrangement of soil particles into aggregates or clumps. Texture relates to the relative proportions of sand, silt, and clay particles in the soil. These properties influence water retention, aeration, root penetration, and nutrient availability. Assessing soil structure and texture helps farmers choose appropriate cultivation practices and soil management techniques.',
  },
];

function SoilTestPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredTestType = TestType.filter(test => 
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '50px', marginTop:'120px', marginLeft:'20px', marginRight:'20px' ,backgroundColor: 'rgba(255, 255, 255, 0.8)',}}>
    <div>
      <h1 style={{ textAlign: 'center' }}>Soil Test Types</h1>
      <TextField
          sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' 
              },
              '& .MuiSelect-select': {
                color: 'white', 
                '&:focus': {
                  backgroundColor: 'transparent' 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black' 
                }
              },
            marginTop: 2,
            marginLeft: '350px',
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', 
              }, 
            }
          }}
          placeholder="Search for a soil test type"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      <ul>
        {filteredTestType.map((test, index) => (
          <li key={index}>
            <h2>{test.name}</h2>
            <p>{test.description}</p>
          </li>
        ))}
      </ul>
    </div>
    </Box>
  );
}

export default SoilTestPage;
