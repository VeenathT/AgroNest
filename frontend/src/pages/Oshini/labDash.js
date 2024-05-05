import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Tabs, Tab, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Select, MenuItem, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function LabDash() {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequests, setPendingRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [farmerNames, setFarmerNames] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [newRequestsCount, setNewRequestsCount] = useState(0);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  
    const fetchPendingRequests = async () => {
      try {
        const labIdResponse = await axios.get(`http://localhost:8070/labAccount/getLabIdByUsername/${storedUserName}`);
        const labId = labIdResponse.data.labId;
        
        const response = await axios.get(`http://localhost:8070/testRequest/retrievePendingTestRequests/${labId}`);
        setPendingRequests(response.data.testRequests);
  
        const names = {};
        await Promise.all(response.data.testRequests.map(async (request) => {
          const name = await getFarmerName(request.farmerID);
          names[request.farmerID] = name;
        }));
        setFarmerNames(names);

        const lastVisitTimestamp = localStorage.getItem('lastVisit');

        localStorage.setItem('lastVisit', new Date().getTime());
  
        if (lastVisitTimestamp) {
          const newRequestsCount = response.data.testRequests.reduce((count, request) => {
            const requestTimestamp = new Date(request.date).getTime();
            if (requestTimestamp > lastVisitTimestamp) {
              return count + 1;
            }
            return count;
          }, 0);
  
          setNewRequestsCount(newRequestsCount);
          if (newRequestsCount > 0) {
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };
  
    fetchPendingRequests();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = async (event, requestId) => {
    const newStatus = event.target.value;
    try {
      await axios.put(`http://localhost:8070/testRequest/updateStatus/${requestId}`, { status: newStatus });
  
      if (newStatus === 'rejected') {
        await axios.put('http://localhost:8070/labAccount/incrementRejected', { userName: sessionStorage.getItem('userName') });
      }
  
      setPendingRequests(pendingRequests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  const getFarmerName = async (farmerId) => {
    try {
      const response = await axios.get(`http://localhost:8070/farmer/getName/${farmerId}`);
      return response.data.fullName;
    } catch (error) {
      console.error('Error fetching farmer name:', error);
      return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const filteredRequests = pendingRequests
  .filter(request =>
    farmerNames[request.farmerID] && farmerNames[request.farmerID].toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {

    const dateComparison = new Date(a.date) - new Date(b.date);

    if (dateComparison === 0) {
      return new Date(`1970-01-01T${a.startTime}`) - new Date(`1970-01-01T${b.startTime}`);
    }

    return dateComparison;
  });

  const NewRequestsPopup = () => {
    return (
      <div style={popupStyle}>
        <div style={popupContentStyle}>
          <p>You have {newRequestsCount} new requests since your last visit.</p>
          <button style={closeButtonStyle} onClick={() => setShowPopup(false)}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div style={{ marginTop:'50px' , paddingTop: '70px' }}>
      <AppBar position="fixed" style={{ marginTop: "107px", backgroundColor: '#0F5132' }}>
        <Toolbar>
          <Typography variant="h6" component="div" style={{ flexGrow: 0, color: 'white' }}>
            Lab Dashboard
          </Typography>
          <Tabs value={tabValue} onChange={handleTabChange} indicatorColor="transparent">
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Pending" disabled={tabValue === 0} style={{ color: 'white' }} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Accepted" component={Link} to="/accepted" style={{ color: 'white' }}/>
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Completed" component={Link} to="/completed" style={{ color: 'white' }}/>
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
          </Tabs>
          <Typography variant="body1" style={{ marginRight: '10px', color: 'white'}}>
            Hello {userName}
          </Typography>
          <Link to="/labProfile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton>
              <AccountCircleIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar /> 
      <div style={{ marginTop: '20px' }} /> 
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', marginBottom: '30px' }}>
        <IconButton>
          <SearchIcon style={{ color: '#0F5132' }}  />
        </IconButton>
        <InputBase
          placeholder="  Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ backgroundColor: 'white', marginLeft: '10px', color: 'black', border: '2px solid #0F5132' }}
        />
      </div>
      <div style={{ margin: '0 20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
        <TableContainer component={Paper} style={{ backgroundColor: '#E8F5E9' }}>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#90EE90' }}>
                <TableCell style={{ color: '#0F5132' }}>Request ID</TableCell>
                <TableCell style={{ color: '#0F5132' }}>Name</TableCell>
                <TableCell style={{ color: '#0F5132' }}>Test Type</TableCell>
                <TableCell style={{ color: '#0F5132' }}>Date</TableCell>
                <TableCell style={{ color: '#0F5132' }}>Start Time</TableCell>
                <TableCell style={{ color: '#0F5132' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request._id}</TableCell>
                  <TableCell>{farmerNames[request.farmerID]}</TableCell>
                  <TableCell>{request.testType}</TableCell>
                  <TableCell>{formatDate(request.date)}</TableCell>
                  <TableCell>{request.startTime}</TableCell>
                  <TableCell>
                    <FormControl>
                      <Select
                        value={request.status}
                        onChange={(event) => handleStatusChange(event, request._id)}
                        style={{ fontSize: '0.8rem', minWidth: 100 }}
                      >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {showPopup && <NewRequestsPopup />}
    </div>
  );
}

const popupStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #ccc',
};

const popupContentStyle = {
  textAlign: 'center',
};

const closeButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#0F5132',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default LabDash;
