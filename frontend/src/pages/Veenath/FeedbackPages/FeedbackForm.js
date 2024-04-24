import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Typography, Container, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const FeedbackForm = () => {
  const location = useLocation();
  const [orderId, setOrderId] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1); // Default to 1 star

  useEffect(() => {
    if (location.state && location.state.feedbackToEdit) {
      const { orderId, farmerName, description, starRating } = location.state.feedbackToEdit;
      setOrderId(orderId);
      setFarmerName(farmerName);
      setDescription(description);
      setRating(starRating);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (location.state && location.state.feedbackToEdit) {
        const { _id } = location.state.feedbackToEdit;
        await axios.put(`http://localhost:8070/api/feedbacks/${_id}`, {
          orderId,
          farmerName,
          description,
          starRating: rating,
        });
      } else {
        await axios.post('http://localhost:8070/api/feedbacks', {
          orderId,
          farmerName,
          description,
          starRating: rating,
          itemcode: 12345, // Example item code, replace with actual item code
        });
      }

      // Add any success handling or redirection here
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF'}} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {location.state && location.state.feedbackToEdit ? 'Edit Feedback' : 'Submit Feedback'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Order ID"
              variant="outlined"
              fullWidth
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Farmer Name"
              variant="outlined"
              fullWidth
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {location.state && location.state.feedbackToEdit ? 'Update' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FeedbackForm;
