import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Tabs, Tab, Badge, TextField, Button, Grid } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import InquiryRow from '../../../Component/Veenath/InquiryComp/InquiryRow';
import InquiryDetailsPopup from '../../../Component/Veenath/InquiryComp/InquiryDetailsPopup';

const DealerInquiry = () => {
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedDealerInquiries, setResolvedDealerInquiries] = useState([]);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        const allInquiries = response.data;
        const dealerPendingInquiries = allInquiries.filter(inquiry => inquiry.status === 'Pending' && inquiry.category === 'Dealer');
        const dealerResolvedInquiries = allInquiries.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Dealer');
        setPendingInquiries(dealerPendingInquiries);
        setResolvedDealerInquiries(dealerResolvedInquiries);
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
    setTabValue(newValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPendingInquiries = pendingInquiries.filter(inquiry =>
    inquiry.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredResolvedInquiries = resolvedDealerInquiries.filter(inquiry =>
    inquiry.topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F8F9F9', width: "1000px", margin: "auto", marginTop: '105px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)'}}>
      <Typography variant="h3" gutterBottom align="center">Welcome to AgroNest Support Services !</Typography>
      <Tabs
        value={tabValue}
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
      {tabValue === 0 ? (
        <div > 
          <Typography variant="h5" gutterBottom align="center">Pending Issues</Typography>
          <TextField 
            sx={{backgroundColor: '#FFFF', width: "500px", margin: "auto", marginBottom: '20px', ml:'250px' }}
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="inherit" size="small">
                  <SearchIcon />
                </Button>
              )
            }}
            style={{ marginBottom: '20px' }}
          />
          {filteredPendingInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center" justifyContent="center" marginLeft="40px">
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
            sx={{backgroundColor: '#FFFF', width: "500px", margin: "auto", marginBottom: '20px', ml:'250px' }}
            variant="outlined"
            placeholder="Search"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              endAdornment: (
                <Button variant="contained" color="inherit" size="small">
                  <SearchIcon />
                </Button>
              )
            }}
            style={{ marginBottom: '20px' }}
          />
          {filteredResolvedInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center" justifyContent="center" marginLeft="40px">
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

export default DealerInquiry;
