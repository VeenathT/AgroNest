import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FarmerListComponent = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedReply, setEditedReply] = useState('');

  useEffect(() => {
    const fetchFarmers = async () => {      //fetchfarmers
      try {
        const response = await axios.get('http://localhost:8070/farmerReport/farmers');
        setFarmers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmers();
  }, []);

  const fetchReplies = async (farmerId) => {
    try {
      const response = await axios.get(`http://localhost:8070/farmerReport/replies/${farmerId}`);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      await axios.delete(`http://localhost:8070/farmerReport/replies/${replyId}`);
      setReplies(replies.filter(reply => reply._id !== replyId));
      toast.success('Reply deleted successfully', { autoClose: 2000 }); 
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete reply', { autoClose: 2000 }); 
    }
  };

  const handleViewClick = async (farmer) => {
    setSelectedFarmer(farmer);
    setOpenPopup(true);
    await fetchReplies(farmer._id); // Fetch replies for selected farmer
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditMode(false); // Reset edit mode 
  };

  const handleReplyClick = async () => {
    try {
      if (editMode) {
        //update in 
        await axios.put(`http://localhost:8070/farmerReport/replies/${editedReply._id}`, { replyText });
        const updatedReplies = replies.map(reply =>
          reply._id === editedReply._id ? { ...reply, replyText } : reply
        );
        setReplies(updatedReplies);
        setEditMode(false);
        toast.success('Reply updated successfully'); 
      } else {
        
        const response = await axios.post(`http://localhost:8070/farmerReport/farmers/${selectedFarmer._id}/reply`, { replyText });
      
        // Update  to "Resolved"
        await axios.put(`http://localhost:8070/farmerReport/farmers/${selectedFarmer._id}/status`);
  
        // Update the local state 
        const updatedFarmer = farmers.map(farmer => 
          farmer._id === selectedFarmer._id ? { ...farmer, status: 'Resolved' } : farmer
        );
        setFarmers(updatedFarmer);
  
        
        setReplies([...replies, response.data]);
        toast.success('Reply sent successfully'); 
      }
      setReplyText('');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    }
  
    
    setOpenPopup(false);
  };
  
  
  
  
  
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteConfirmation = (replyId) => {
    setReplyToDelete(replyId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setReplyToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteConfirmed = async () => {
    if (replyToDelete) {
      await deleteReply(replyToDelete);
      setReplyToDelete(null);
      setDeleteConfirmationOpen(false);
    }
  };

  const handleEditClick = (reply) => {
    setEditedReply(reply);
    setReplyText(reply.replyText);
    setOpenPopup(true);
    setEditMode(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pendingFarmers= farmers
    .filter(farmer => farmer.status === 'Pending')
    .sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const resolvedFarmers = farmers.filter(farmer => farmer.status === 'Resolved');

  return (
    <Grid container>
      <Grid item xs={9}>
        <Box bgcolor='#cde3c3'>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab 
              label="Pending" 
              sx={{ color: 'green', '&.Mui-selected': { color: 'green' } }}
            />
            <Tab 
              label="Resolved" 
              sx={{ color: 'green', '&.Mui-selected': { color: 'green' } }}
            />
          </Tabs>
          <ToastContainer position="center" />
          <Dialog open={openPopup} onClose={handleClosePopup}>
            <DialogTitle>{selectedFarmer && selectedFarmer.name}</DialogTitle>
            <DialogContent>
              <p>Topic: {selectedFarmer && selectedFarmer.topic}</p>
              <p>Description: {selectedFarmer && selectedFarmer.description}</p>
              <p>Area: {selectedFarmer && selectedFarmer.area}</p>
              <p>Status: {selectedFarmer && selectedFarmer.status}</p>
              {tabValue === 0 && (
                <div>
                  <TextField
                    label="Reply"
                    multiline
                    fullWidth
                    variant="outlined"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button onClick={handleReplyClick}>Send</Button>
                </div>
              )}
              {tabValue === 1 && (
                <div>
                  {replies.map((reply) => (
                    <div key={reply._id}>
                      <p>{reply.replyText}</p>
                      <Button onClick={() => handleDeleteConfirmation(reply._id)}>Delete</Button>
                      <Button onClick={() => handleEditClick(reply)}>Edit</Button> {/* Add edit button */}
                    </div>
                  ))}
                  <TextField
                    label="Reply"
                    multiline
                    fullWidth
                    variant="outlined"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button onClick={handleReplyClick}>{editMode ? 'Update' : 'Send'}</Button> {/* Change button text based on edit mode */}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePopup}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteConfirmationOpen}
            onClose={handleDeleteConfirmationClose}
          >                                          
          
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this reply?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
              <Button onClick={handleDeleteConfirmed} color="error">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {tabValue === 0 && (
            <TableContainer component={Paper} style={{ width: 1000, height: 600, bgcolor:'#cde3c3' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingFarmers.map((farmer) => (
                    <TableRow key={farmer._id}>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>{farmer.topic}</TableCell>
                      <TableCell>{farmer.description}</TableCell>
                      <TableCell>{farmer.priority}</TableCell>
                      <TableCell>{farmer.area}</TableCell>
                      <TableCell>{farmer.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleViewClick(farmer)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tabValue === 1 && (
            <TableContainer component={Paper} style={{ width: 1000, height: 600, bgcolor:'#cde3c3' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Area</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resolvedFarmers.map((farmer) => (
                    <TableRow key={farmer._id}>
                      <TableCell>{farmer.name}</TableCell>
                      <TableCell>{farmer.topic}</TableCell>
                      <TableCell>{farmer.description}</TableCell>
                      <TableCell>{farmer.priority}</TableCell>
                      <TableCell>{farmer.area}</TableCell>
                      <TableCell>{farmer.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleViewClick(farmer)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default FarmerListComponent;
