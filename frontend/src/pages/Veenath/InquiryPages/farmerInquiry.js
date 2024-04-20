import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Tabs, Tab, Badge, TextField, Button, Grid } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import InquiryRow from '../../../Component/Veenath/InquiryComp/InquiryRow';
import InquiryDetailsPopup from '../../../Component/Veenath/InquiryComp/InquiryDetailsPopup';

const FarmerInquiry = () => {
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedFarmerInquiries, setResolvedFarmerInquiries] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        const allInquiries = response.data;
        const farmerPendingInquiries = allInquiries.filter(inquiry => inquiry.status === 'Pending' && inquiry.category === 'Farmer');
        const farmerResolvedInquiries = allInquiries.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Farmer');
        setPendingInquiries(farmerPendingInquiries);
        setResolvedFarmerInquiries(farmerResolvedInquiries);
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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPendingInquiries = pendingInquiries.filter(inquiry =>
    inquiry.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResolvedInquiries = resolvedFarmerInquiries.filter(inquiry =>
    inquiry.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F8F9F9', width: "1000px", margin: "auto", marginTop: '100px' }}>
      <Typography variant="h3" gutterBottom align="center">Welcome to AgroNest Support Services !</Typography>
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: '20px' }}
      >
        <Tab sx={{ marginTop: '20px' ,backgroundColor:'#FEF9E7' }}
          label={
            <Badge badgeContent={filteredPendingInquiries.length} color="error">
              <Typography variant="h6" sx={{ color: 'black' }}>Pending</Typography>
            </Badge>
          }
        />
         <Tab sx={{ marginTop: '20px' ,backgroundColor:'#EAFAF1' }}
          label={
            <Badge badgeContent={filteredResolvedInquiries.length} color="success">
              <Typography variant="h6" sx={{ color: 'black' }}>Resolved</Typography>
            </Badge>
          }
        />
      </Tabs>
      {selectedTab === 0 ? (
        <div>
          <Typography variant="h5" gutterBottom align="center">Pending Issues</Typography>
          <TextField
             sx={{backgroundColor: '#FFFF', width: "500px", margin: "auto", marginBottom: '20px', ml:'260px' }}
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="info" size="small">
                  <SearchIcon />
                </Button>
              )
            }}
            style={{ marginBottom: '20px' }}
          />
          {filteredPendingInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center" justifyContent="center">
              <Grid item xs={10}>
                <InquiryRow inquiry={inquiry} />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleViewInquiry(inquiry)} variant="contained" color="success" style={{ marginBottom: '20px' }}>View</Button>
              </Grid>
            </Grid>
          ))}
        </div>
      ) : (
        <div>
          <Typography variant="h5" gutterBottom align="center">Resolved Issues</Typography>
          <TextField
            sx={{backgroundColor: '#FFFF', width: "500px", margin: "auto", marginBottom: '20px', ml:'260px' }}
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="info" size="small">
                  <SearchIcon />
                </Button>
              )
            }}
            style={{ marginBottom: '20px' }}
          />
          {filteredResolvedInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center" justifyContent="center">
              <Grid item xs={10}>
                <InquiryRow inquiry={inquiry} />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleViewInquiry(inquiry)} variant="contained" color="success" style={{ marginBottom: '20px' }}>Open Reply</Button>
              </Grid>
            </Grid>
          ))}
        </div>
      )}
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

export default FarmerInquiry;
