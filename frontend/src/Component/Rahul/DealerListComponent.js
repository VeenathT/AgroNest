import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Grid } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DealerListComponent = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [replyToDelete, setReplyToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedReply, setEditedReply] = useState('');

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/farmerReport/dealers');
        setDealers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  const fetchReplies = async (dealerId) => {
    try {
      const response = await axios.get(`http://localhost:8070/farmerReport/replies/${dealerId}`);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  const deleteReply = async (replyId) => {
    try {
      await axios.delete(`http://localhost:8070/farmerReport/replies/${replyId}`);
      setReplies(replies.filter(reply => reply._id !== replyId));
      toast.success('Reply deleted successfully', { autoClose: 3000 }); // Notification disappears after 3 seconds
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete reply', { autoClose: 3000 }); // Notification disappears after 3 seconds
    }
  };

  const handleViewClick = async (dealer) => {
    setSelectedDealer(dealer);
    setOpenPopup(true);
    await fetchReplies(dealer._id); // Fetch replies for the selected dealer
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setEditMode(false); // Reset edit mode when closing the dialog
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

  const handleReplyClick = async () => {
    try {
      if (editMode) {
        // Handle update if in edit mode
        await handleUpdateClick();
      } else {
        // Perform create if not in edit mode
        const response = await axios.post(`http://localhost:8070/farmerReport/dealers/${selectedDealer._id}/reply`, { replyText });
      
        // Update the status to "Resolved"
        await axios.put(`http://localhost:8070/farmerReport/dealers/${selectedDealer._id}/status`);
  
        // Update the local state of dealers
        const updatedDealers = dealers.map(dealer => 
          dealer._id === selectedDealer._id ? { ...dealer, status: 'Resolved' } : dealer
        );
        setDealers(updatedDealers);
  
        // Add the new reply to the list of replies
        setReplies([...replies, response.data]);
        toast.success('Reply sent successfully'); // Notification for successful reply
      }
      setReplyText('');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    }
  
    // Close the popup window
    setOpenPopup(true);
  };

  const handleUpdateClick = async () => {
    try {
      const updatedReply = { ...editedReply, replyText }; // Combine edited reply with updated text
      const response = await axios.put(`http://localhost:8070/farmerReport/replies/${editedReply._id}`, { replyText });

      // Update the local state of replies with the updated reply
      const updatedReplies = replies.map(reply =>
        reply._id === editedReply._id ? { ...reply, replyText } : reply
      );
      setReplies(updatedReplies);

      toast.success('Reply updated successfully');
    } catch (error) {
      console.error('Error updating reply:', error);
      toast.error('Failed to update reply');
    }
    setOpenPopup(true); // Close the popup window after updating
    setEditMode(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // set order High - low
  const pendingDealers = dealers
    .filter(dealer => dealer.status === 'Pending')
    .sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const resolvedDealers = dealers.filter(dealer => dealer.status === 'Resolved');

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
            <DialogTitle>{selectedDealer && selectedDealer.name}</DialogTitle>
            <DialogContent>
              <p>Topic: {selectedDealer && selectedDealer.topic}</p>
              <p>Description: {selectedDealer && selectedDealer.description}</p>
              <p>Area: {selectedDealer && selectedDealer.area}</p>
              <p>Status: {selectedDealer && selectedDealer.status}</p>
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
                  <Button onClick={handleReplyClick}>{editMode ? 'Update' : 'Send'}</Button> {/* Change button text based on edit mode */}
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
            <TableContainer component={Paper} style={{ width: 1060, height: 600, bgcolor:'#cde3c3' }}>
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
                  {pendingDealers.map((dealer) => (
                    <TableRow key={dealer._id}>
                      <TableCell>{dealer.name}</TableCell>
                      <TableCell>{dealer.topic}</TableCell>
                      <TableCell>{dealer.description}</TableCell>
                      <TableCell>{dealer.priority}</TableCell>
                      <TableCell>{dealer.area}</TableCell>
                      <TableCell>{dealer.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleViewClick(dealer)}>
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
            <TableContainer component={Paper} style={{ width: 1060, height: 600, bgcolor:'#cde3c3' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Topic</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resolvedDealers.map((dealer) => (
                    <TableRow key={dealer._id}>
                      <TableCell sx={{ width: '100px' }}>{dealer.name}</TableCell>
                      <TableCell>{dealer.topic}</TableCell>
                      <TableCell>{dealer.description}</TableCell>
                      <TableCell>{dealer.status}</TableCell>
                      <TableCell>
                        <Button variant="contained" onClick={() => handleViewClick(dealer)}>
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

export default DealerListComponent;
