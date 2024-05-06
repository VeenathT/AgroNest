import React, { useState, useEffect } from 'react';
import { ListItemText, Button, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ToggleButton, ToggleButtonGroup, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { DeleteOutline, Edit, SentimentVeryDissatisfied, SentimentDissatisfied, SentimentSatisfied, SentimentSatisfiedAltOutlined, SentimentVerySatisfied, Mail } from '@mui/icons-material';
import axios from 'axios';

const PastFeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
  const [filterRating, setFilterRating] = useState(null);

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

  const getFaceIcon = (rating) => {
    switch (rating) {
      case 1:
        return <SentimentVeryDissatisfied style={{ color: '#E66060' , fontSize: 35 }} />;
      case 2:
        return <SentimentDissatisfied style={{ color: '	#FFA500', fontSize: 35 }} />;
      case 3:
        return <SentimentSatisfied style={{ color: '#FFEA00', fontSize: 35 }} />;
      case 4:
        return <SentimentSatisfiedAltOutlined style={{ color: '#8FD547', fontSize: 35 }} />;
      case 5:
        return <SentimentVerySatisfied style={{ color: '#06CB00' , fontSize: 35 }} />;
      default:
        return null;
    }
  };

  const handleFilterChange = (event, newFilterRating) => {
    setFilterRating(newFilterRating);
  };

  const filteredFeedbacks = filterRating
    ? feedbacks.filter((feedback) => feedback.starRating === filterRating)
    : feedbacks;

  return (
    <Container style={{ marginTop: '105px', backgroundColor: '#F5F5F5', padding: '20px' }} maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        My Reviews
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Make Valuable Decisions With Past Reviews !
      </Typography>
      <div>
          <Badge style={{ marginLeft:'800px' }} badgeContent={filteredFeedbacks.length} color="success">
            <Mail fontSize="large" />
          </Badge>
        <ToggleButtonGroup style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center'}} value={filterRating} onChange={handleFilterChange} exclusive aria-label="rating-filter">
          <ToggleButton value={5} style={{ backgroundColor: filterRating === 5 ? '#B2B9B0' : '' }}>
            <SentimentVerySatisfied style={{ color: '#06CB00', fontSize: 35 }} />
          </ToggleButton>
          <ToggleButton value={4} style={{ backgroundColor: filterRating === 4 ? '#B2B9B0' : '' }}>
            <SentimentSatisfiedAltOutlined style={{ color: '#8FD547', fontSize: 35 }} />
          </ToggleButton>
          <ToggleButton value={3} style={{ backgroundColor: filterRating === 3 ? '#B2B9B0' : '' }}>
            <SentimentSatisfied style={{ color: '#FFEA00', fontSize: 35 }} />
          </ToggleButton>
          <ToggleButton value={2} style={{ backgroundColor: filterRating === 2 ? '#B2B9B0' : '' }}>
            <SentimentDissatisfied style={{ color: '#FFA500', fontSize: 35 }} />
          </ToggleButton>
          <ToggleButton value={1} style={{ backgroundColor: filterRating === 1 ? '#B2B9B0' : '' }}>
            <SentimentVeryDissatisfied style={{ color: '#E66060', fontSize: 35 }} />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>

      {filteredFeedbacks.map((feedback, index) => (
        <div key={feedback._id} style={{ marginBottom: '20px' }}>
          {index !== 0 && <Divider />}
          <Accordion>
            <AccordionSummary style={{ justifyContent: 'space-between' }}>
              <ListItemText primary={`Item Code: ${feedback.itemcode}`} secondary={`Rating: ${feedback.starRating}`} />
              {getFaceIcon(feedback.starRating)}
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{feedback.description}</Typography>
              <Button style={{ marginTop:'10px', marginRight:'10px' }} variant="contained" color="success" onClick={() => handleEdit(feedback._id)}><Edit /></Button>
              <Button style={{ marginTop:'10px' }} variant="contained" color="error" onClick={() => { setDeleteDialogOpen(true); setSelectedFeedbackId(feedback._id); }}><DeleteOutline /></Button>
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
