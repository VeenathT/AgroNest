import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Typography, Container, Grid, Snackbar, Box } from '@mui/material'; // Import Box
import { Alert } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';

const FeedbackForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedbackId } = useParams(); // Get the feedback ID from the URL

  const [orderId, setOrderId] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1); // Default to 1 star
  const [hover, setHover] = useState(-1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

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

    if (!orderId || !farmerName || !description) {
      setOpenSnackbar(true); // Open snackbar to notify user to fill the form
      return;
    }

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

      setSuccessSnackbar(true); // Set success
      setTimeout(() => {
        navigate('/PastFeedbackList');
      }, 2000); // Navigate after 2 seconds
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  const handleCancel = () => {
    navigate('/ItemList'); // Go back to the previous page (ItemList)
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Close snackbar
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false); // Close success snackbar
  };

  return (
    <div style={{ backgroundColor: '#F8F9F9', width: "500px", margin: "auto", marginTop: '100px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)'}}>
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBotom>
        {feedbackId ? 'Edit Feedback' : 'Submit Feedback'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label="Order ID"
              variant="outlined"
              fullWidth
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
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
              rows={3}
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
              onChange={(event, newValue) => setRating(newValue)}
              onChangeActive={(event, newHover) => setHover(newHover)}
              sx={{ fontSize: 50 }}
            />
            <Box sx={{ ml: 2 }}>{rating !== null && (hover !== -1 ? hover : rating)}</Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              <SaveIcon sx={{ mr: 1 }} />
              {feedbackId ? 'Update' : 'Submit'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleCancel}
              sx={{ ml: 2 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Please fill all the fields before submitting.
        </Alert>
      </Snackbar>
      <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={handleCloseSuccessSnackbar}>
        <Alert onClose={handleCloseSuccessSnackbar} severity="success" sx={{ width: '100%' }}>
          Feedback submitted successfully!
        </Alert>
      </Snackbar>
    </Container>
    </div>
  );
};

export default FeedbackForm;
