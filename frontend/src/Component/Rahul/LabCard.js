import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions,Grid } from '@mui/material';
import LabPDFGenerator from './LabPDFGenerator'; 
import AllLabsPDFGenerator from './AllLabsPDFGenerator'; 

import labBackground from '../../images/Rahul/but2.jpg'; 
import buttonBackground from '../../images/Rahul/but2.jpg';
import Sidebar from './Sidebar';
const LabCards = () => {
  const [labs, setLabs] = useState([]);
  const [filteredLabs, setFilteredLabs] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);
  const [filterKey, setFilterKey] = useState("");
  const [filterBy, setFilterBy] = useState("district");
  const [labCount, setLabCount] = useState(labs.length);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:8070/labs');
        const fetchedLabs = response.data;
        setLabs(fetchedLabs);
        setFilteredLabs(fetchedLabs);
        setLabCount(fetchedLabs.length); // Initialize lab count here
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };
  
    fetchLabs();
  }, []);
  

  const handleViewClick = (labId) => {
    const labToView = labs.find(lab => lab._id === labId);
    setSelectedLab(labToView);
    setOpenDialog(true);
  };

   const handleUpdateLabLevel = () => {
                 // Open the update dialog 
    
  };

  const handleDialogClose = () => {
    setSelectedLab(null);
    setOpenDialog(false);
  };

  const handleFilter = () => {
    let filtered;
    if (filterKey.trim() === "" || filterKey === "All") {
      filtered = labs;
    } else {
      filtered = labs.filter(lab => lab[filterBy] === filterKey);
    }
    setFilteredLabs(filtered);
    // Update the lab count
    setLabCount(filtered.length);
  };

  const handleExportCSV = () => {
    // Convert labs data to CSV format and trigger download
    const csvContent = labs.map(lab => Object.values(lab).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'all_labs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <div style={{ marginTop:'130px', marginBottom: '20px', display: 'flex', justifyContent: 'flex-end', paddingRight: '50px' }}>
        <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: '100px', minHeight:'10px' }}>
          <InputLabel id="filter-by-label">Filter By</InputLabel>
          <Select
            labelId="filter-by-label"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            label="Filter By"
          >
            <MenuItem value="district">District</MenuItem>
            <MenuItem value="city">City</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{ marginRight: '10px', minWidth: '150px' }}>
          <InputLabel id="filter-key-label">Filter Key</InputLabel>
          <Select
            labelId="filter-key-label"
            value={filterKey}
            onChange={(e) => setFilterKey(e.target.value)}
            label="Filter Key"
          >
            <MenuItem value="All">All</MenuItem>
            {labs.map((lab, index) => (
              <MenuItem key={index} value={lab[filterBy]}>{lab[filterBy]}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleFilter} sx={{ backgroundColor: 'green', color: 'white' }}>Filter</Button>

      </div>
      <div style={{ display: 'flex' , justifyContent: 'center', position: 'relative', marginLeft: '95px', width: '1100px' }}>
        
                        {/* Export all labs */}
        <div style={{ position: 'absolute', top: '6px', right: '-60px', zIndex: '1' }}>
          <Button width="200px" onClick={handleExportCSV} sx={{ color: 'green' }} >Export All Labs</Button>
        </div>
        
                    {/* lab count */}
        <div style={{ position: 'absolute',  height:'18px', top: '-80px',marginTop:'50px', right: '420px',backgroundImage: `url(${buttonBackground}`, padding: '20px', borderRadius: '12px', zIndex: '1' }}>
          <Typography  variant="h5" style={{ color: 'white',textAlign:'center', textDecoration:'line' }}>Total Labs: {labCount}</Typography>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap' ,marginLeft:'100px', marginTop:'40px'}}>
          {filteredLabs.map((lab, index) => (
            <Card key={lab._id} sx={{ width: 200, margin: '25px', position: 'relative', backgroundImage: `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url(${labBackground})`, backgroundSize: 'cover', borderRadius: '15px' }}>
              <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', height: '93%' }}>
                <Typography variant="h6" sx={{ mb: 1, position: 'absolute', top: '5px', left: '5px' ,color:'white',fontSize:'0.9em',fontWeight:'Bold'}}>
                  {index + 1}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1, textAlign: 'center',color:'white',fontSize:'1.7em',fontWeight:'Bold' }}>
                  {lab.name}
                </Typography>
                <CardContent sx={{ p: 1, border: '0px solid lightgrey', marginTop: 'auto' }}>
                  <Button variant="contained" size="small" onClick={() => handleViewClick(lab._id)} sx={{ backgroundColor: 'green' }}>
                    View
                  </Button>
                </CardContent>
              </CardContent>
            </Card>
          ))}
        </div>        {/*Show data in popup window*/}
      </div>
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle sx={{ fontSize: 26, fontWeight: 'bold' }}>{selectedLab?.name}</DialogTitle>
        <DialogContent sx={{ fontSize: 16, fontWeight: 'bold', maxHeight: '200vh' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Address: {selectedLab?.address}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>Phone: {selectedLab?.phone}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>District: {selectedLab?.district}</Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>City: {selectedLab?.city}</Typography>
          {/* Include the PDF export button */}
          {selectedLab && <LabPDFGenerator lab={selectedLab} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}  sx={{ backgroundColor: 'white', color: 'green' }}>Close</Button>
        </DialogActions>
      </Dialog>

     
      <AllLabsPDFGenerator labs={labs} />
    </div>
  );
};

export default LabCards;
