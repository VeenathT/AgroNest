import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
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
      toast.success('Reply deleted successfully');
    } catch (error) {
      console.error('Error deleting reply:', error);
      toast.error('Failed to delete reply');
    }
  };

  const handleViewClick = async (dealer) => {
    setSelectedDealer(dealer);
    setOpenPopup(true);
    await fetchReplies(dealer._id); // Fetch replies for the selected dealer
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleReplyClick = async () => {
    try {
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
      setReplyText('');
      
      toast.success('Reply sent successfully');
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Failed to send reply');
    }
  
    // Close the popup window
    setOpenPopup(false);
  };
  
  
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const pendingDealers = dealers
    .filter(dealer => dealer.status === 'Pending')
    .sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  const resolvedDealers = dealers.filter(dealer => dealer.status === 'Resolved');

  return (
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
              <Button onClick={handleReplyClick}>Send</Button>
            </div>
          )}
          {tabValue === 1 && (
            <div>
            {/* List of replies for resolved dealers */}
            {replies.map((reply) => (
              <div key={reply._id}>
                <p>{reply.replyText}</p>
                {/* Delete button for each reply */}
                <Button onClick={() => deleteReply(reply._id)}>Delete</Button>
              </div>
            ))}
            {/* Input field and Send button for replying */}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Close</Button>
        </DialogActions>
      </Dialog>
      {tabValue === 0 && (
        <TableContainer component={Paper} style={{ width: 950, height: 600, bgcolor:'#cde3c3' }}>
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
        <TableContainer component={Paper} style={{ width: 950, height: 600, bgcolor:'#cde3c3' }}>
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
              {resolvedDealers.map((dealer) => (
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
    </Box>
  );
};

export default DealerListComponent;
