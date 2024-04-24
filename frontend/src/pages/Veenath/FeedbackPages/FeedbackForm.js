import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Typography, Container, Grid } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FeedbackForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedbackId } = useParams(); // Get the feedback ID from the URL

  const [orderId, setOrderId] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1); // Default to 1 star

  useEffect(() => {
    console.log('Feedback ID:', feedbackId); // Check if feedbackId is received

    if (location.state && location.state.feedbackToEdit) {
      // If feedbackToEdit is passed through location state, use that
      const { orderId, farmerName, description, starRating } = location.state.feedbackToEdit;
      setOrderId(orderId);
      setFarmerName(farmerName);
      setDescription(description);
      setRating(starRating);
    } else if (feedbackId) {
      // If there's a feedbackId in the URL, fetch the feedback for editing
      const fetchFeedback = async () => {
        try {
          const response = await axios.get(`http://localhost:8070/api/feedbacks/${feedbackId}`);
          const { orderId, farmerName, description, starRating } = response.data;
          setOrderId(orderId);
          setFarmerName(farmerName);
          setDescription(description);
          setRating(starRating);
        } catch (err) {
          console.error(err);
          // Add error handling here
        }
      };

      fetchFeedback();
    }
  }, [location.state, feedbackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (feedbackId) {
        // If editing an existing feedback, send a PUT request
        await axios.put(`http://localhost:8070/api/feedbacks/${feedbackId}`, {
          orderId,
          farmerName,
          description,
          starRating: rating,
        });
      } else {
        // If adding new feedback, send a POST request
        await axios.post('http://localhost:8070/api/feedbacks', {
          orderId,
          farmerName,
          description,
          starRating: rating,
          itemcode: 12345, // Example item code, replace with actual item code
        });
      }

      // Redirect to PastFeedbackList after submission
      navigate.push('/PastFeedbackList');
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  const handleCancel = () => {
    navigate.goBack(); // Go back to the previous page (PastFeedbackList)
  };

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF'}} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        {feedbackId ? 'Edit Feedback' : 'Submit Feedback'}
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
              {feedbackId ? 'Update' : 'Submit'}
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FeedbackForm;
