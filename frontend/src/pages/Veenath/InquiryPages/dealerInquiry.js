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

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '50px' }}>
      <Typography variant="h3" gutterBottom>Dealer Inquiries</Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab
          label={
            <Badge badgeContent={pendingInquiries.length} color="error">
              Pending
            </Badge>
          }
        />
        <Tab
          label={
            <Badge badgeContent={resolvedDealerInquiries.length} color="error">
              Resolved
            </Badge>
          }
        />
      </Tabs>
      <TextField
        variant="outlined"
        placeholder="Search"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <Button variant="contained" color="primary" size="small">
              <SearchIcon />
            </Button>
          )
        }}
        style={{ marginBottom: '20px' }}
      />
      {tabValue === 0 ? (
        <div>
          <Typography variant="h4" gutterBottom>Pending Inquiries</Typography>
          {pendingInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center">
              <Grid item xs={10}>
                <InquiryRow inquiry={inquiry} />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleViewInquiry(inquiry)} variant="contained" color="primary">View</Button>
              </Grid>
            </Grid>
          ))}
        </div>
      ) : (
        <div>
          <Typography variant="h4" gutterBottom>Resolved Inquiries</Typography>
          {resolvedDealerInquiries.map((inquiry) => (
            <Grid container key={inquiry._id} alignItems="center">
              <Grid item xs={10}>
                <InquiryRow inquiry={inquiry} />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => handleViewInquiry(inquiry)} variant="contained" color="primary">View</Button>
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
