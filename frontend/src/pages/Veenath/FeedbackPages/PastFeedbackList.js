import React, { useState, useEffect } from 'react';
import { ListItemText, Button, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import { DeleteOutline, Edit } from '@mui/icons-material';
import axios from 'axios';

const PastFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/feedbacks');
        setFeedbacks(response.data.feedbacks);
      } catch (err) {
        console.error(err);
        // Add error handling here
      }
    };

    fetchFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/feedbacks/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  const handleEdit = (id) => {
    setSelectedFeedbackId(id);
    setEditDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#F5F5F5', padding: '20px' }} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Past Feedback Forms
      </Typography>
      {feedbacks.map((feedback, index) => (
        <div key={feedback._id} style={{ marginBottom: '20px' }}>
          {index !== 0 && <Divider />}
          <Accordion>
            <AccordionSummary>
              <ListItemText primary={`Item Code: ${feedback.itemcode}`} secondary={`Rating: ${feedback.starRating}`} />
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{feedback.description}</Typography>
              <Button onClick={() => handleEdit(feedback._id)}><Edit />Edit</Button>
              <Button onClick={() => { setDeleteDialogOpen(true); setSelectedFeedbackId(feedback._id); }}><DeleteOutline />Delete</Button>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this feedback?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>No</Button>
          <Button onClick={() => handleDelete(selectedFeedbackId)} color="error">Yes, Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Confirm Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to edit this feedback?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>No</Button>
          <Button component={Link} to={`/FeedbackForm/${selectedFeedbackId}`} color="primary">Yes, Edit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PastFeedbackList;
