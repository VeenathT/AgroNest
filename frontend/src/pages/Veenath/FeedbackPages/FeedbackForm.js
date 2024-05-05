import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Typography, Container, Grid, Snackbar, Box } from '@mui/material'; 
import { Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';

const FeedbackForm = () => {
  const { orderId } = useParams(); // Get orderId from URL parameters
  const navigate = useNavigate();

  const [farmerName, setFarmerName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1); 
  const [hover, setHover] = useState(-1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  useEffect(() => {
    // Fetch order details based on orderId
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/order/get/${orderId}`);
        const { farmerName } = response.data; // Assuming 'farmerName' is part of the order details
        setFarmerName(farmerName);
      } catch (err) {
        console.error(err);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId || !farmerName || !description) {
      setOpenSnackbar(true); 
      return;
    }

    try {
      await axios.post('http://localhost:8070/api/feedbacks', {
        orderId,
        farmerName,
        description,
        starRating: rating,
        itemcode: 12345, 
      });

      setSuccessSnackbar(true); 
      setTimeout(() => {
        navigate('/PastFeedbackList');
      }, 2000); 
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  const handleCancel = () => {
    navigate('/ItemList'); 
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); 
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false); 
  };

  return (
    <div style={{ backgroundColor: '#F8F9F9', width: "500px", margin: "auto", marginTop: '150px', boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)'}}>
    <Container maxWidth="sm">
      <Typography style={{ marginBottom:'20px'}} variant="h4" align="center" gutterBotom>
        Submit Feedback
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <TextField
              label={`Order ID: ${farmerName.name}`}
              variant="outlined"
              fullWidth
              value={farmerName.name} // Pre-fill orderId
              InputProps={{ readOnly: false }}
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
              Submit
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
