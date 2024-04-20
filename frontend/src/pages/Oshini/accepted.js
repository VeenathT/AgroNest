import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Tabs, Tab, Paper, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function AcceptedRequests() {
  const [userName, setUserName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [tabValue, setTabValue] = useState(0); // Define tabValue state variable
  const [farmerNames, setFarmerNames] = useState({});

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Fetch accepted requests
    const fetchAcceptedRequests = async () => {
      try {
        const labIdResponse = await axios.get(`http://localhost:8070/labAccount/getLabIdByUsername/${storedUserName}`);
        const labId = labIdResponse.data.labId;
        
        const response = await axios.get(`http://localhost:8070/testRequest/retrieveAcceptedTestRequests/${labId}`);
        setAcceptedRequests(response.data.testRequests);

        // Fetch farmer names for each request
        const names = {};
        await Promise.all(response.data.testRequests.map(async (request) => {
          const name = await getFarmerName(request.farmerID);
          names[request.farmerID] = name;
        }));
        setFarmerNames(names);
      } catch (error) {
        console.error('Error fetching accepted requests:', error);
      }
    };

    fetchAcceptedRequests();
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
  
      // Check if the new status is 'completed' or 'rejected'
      if (newStatus === 'completed') {
        // Increment the 'completed' value of the laboratory
        await axios.put(`http://localhost:8070/labAccount/incrementCompleted/${userName}`);
      } else if (newStatus === 'rejected') {
        // Increment the 'rejected' value of the laboratory
        await axios.put(`http://localhost:8070/labAccount/incrementRejected/${userName}`);
      }
  
      // Update the acceptedRequests state
      setAcceptedRequests(acceptedRequests.map(request => {
        if (request._id === requestId) {
          return { ...request, status: newStatus };
        }
        return request;
      }));
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

  // Filter acceptedRequests based on searchQuery
  const filteredRequests = acceptedRequests.filter(request =>
    farmerNames[request.farmerID] && farmerNames[request.farmerID].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}>
            Lab Dashboard
          </Typography>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Pending" component={Link} to="/labDash" />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Accepted" disabled={tabValue === 0} />
            <Tab label="" disabled={tabValue === 0} />
            <Tab label="Completed" component={Link} to="/completed" />
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
      <Toolbar /> {/* Spacer for the app bar */}
      <div style={{ marginTop: '20px' }} /> {/* Spacer for the content */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px', marginBottom: '30px' }}>
        <IconButton>
          <SearchIcon sx={{ color: 'white' }}  />
        </IconButton>
        <InputBase
          placeholder="  Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ backgroundColor: 'white', marginLeft: '10px', color: 'black' }}
        />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Test Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>Status</TableCell> {/* Add a new column for the status dropdown */}
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
                    <select value={request.status} onChange={(event) => handleStatusChange(event, request._id)}>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default AcceptedRequests;
