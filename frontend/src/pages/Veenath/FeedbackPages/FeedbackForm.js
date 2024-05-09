import React, { useState, useEffect } from 'react';
import { TextField, Button, Rating, Typography, Container, Grid, Snackbar, Box } from '@mui/material'; 
import { Alert } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';

const FeedbackForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { feedbackId } = useParams(); 

  const [orderId, setOrderId] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(1); 
  const [hover, setHover] = useState(-1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [successSnackbar, setSuccessSnackbar] = useState(false);

  useEffect(() => {
    console.log('Feedback ID:', feedbackId); 

    if (location.state && location.state.feedbackToEdit) {
      
      const { orderId, farmerName, description, starRating } = location.state.feedbackToEdit;
      setOrderId(orderId);
      setFarmerName(farmerName);
      setDescription(description);
      setRating(starRating);
    } else if (feedbackId) {
      
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
        
        }
      };

      fetchFeedback();
    }
  }, [location.state, feedbackId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!orderId || !farmerName || !description) {
      setOpenSnackbar(true); 
      return;
    }

    try {
      if (feedbackId) {
        
        await axios.put(`http://localhost:8070/api/feedbacks/${feedbackId}`, {
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
          itemcode: 12345, 
        });
      }

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
    <div style={{ backgroundColor: '#FFFF', padding:'20px', borderRadius:'40px', width: "500px", margin: "auto", marginTop: '150px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)'}}>
    <Container maxWidth="sm">
      <Typography style={{ marginBottom:'20px'}} variant="h4" align="center" gutterBotom>
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