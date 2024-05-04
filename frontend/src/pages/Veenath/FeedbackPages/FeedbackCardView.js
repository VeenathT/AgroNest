import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Rating, CardActions, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import FeedbackDetailsDialog from '../../../Component/Veenath/FeedbackComp/FeedbackDetailsDialog';// Assuming FeedbackDetailsDialog is in the same directory

const FeedbackCardView = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filterRating, setFilterRating] = useState(null);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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

  // Function to count feedbacks for each star rating
  const countFeedbacksByRating = (rating) => {
    return feedbacks.filter((feedback) => feedback.starRating === rating).length;
  };

  // Function to filter feedbacks by star rating
  const handleFilter = (rating) => {
    setFilterRating(rating);
  };

  // Function to reset filter
  const handleResetFilter = () => {
    setFilterRating(null);
  };

  // Define star labels
  const starLabels = ['Poor', 'OK', 'Average', 'Good', 'Excellent'];

  // Data for the bar chart
  const data = [...Array(5).keys()].map((rating) => ({
    rating: rating + 1,
    count: countFeedbacksByRating(rating + 1)
  }));

  // Function to handle click on View Details button
  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setOpenDetailsDialog(true);
  };

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF', width: '90%' }} maxWidth="xl">
      <Typography marginTop={15} variant="h4" align="center" gutterBottom>
        All Feedbacks
      </Typography>
      {/* Rating filter and chart side by side */}
      <Box display="flex" flexDirection="row" alignItems="flex-start" marginTop={5} marginBottom={5} marginRight={10}>
        {/* Rating filter */}
        <Box width="100%" height={150} display="flex" flexDirection="column" alignItems="flex-start" marginRight={10} marginLeft={1}>
          {[...Array(5).keys()].map((rating) => (
            <Box key={rating} display="flex" alignItems="center" marginBottom={1} onClick={() => handleFilter(rating + 1)} style={{ cursor: 'pointer' }}>
              <Typography variant="subtitle1" style={{ marginRight: '5px' }}>
                {countFeedbacksByRating(rating + 1)}
              </Typography>
              <Rating name="read-only" value={rating + 1} readOnly />
              <Typography variant="subtitle1" style={{ marginLeft: '5px' }}>
                {starLabels[rating]}
              </Typography>
            </Box>
          ))}
          <Button onClick={handleResetFilter}>Reset</Button>
        </Box>
        {/* Bar chart */}
        <Box width="60%">
          <Typography variant="h6" align="center" gutterBottom>
            Feedback Ratings Distribution
          </Typography>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={data}>
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#FF5733', '#FFBD33', '#D9FF33', '#33FF69', '#33FFEC'][index % 5]} />
              ))}
              <Bar dataKey="count" fill="#299B21" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      {/* Feedback cards displayed horizontally */}
      <Grid container spacing={2}>
        {feedbacks
          .filter((feedback) => filterRating ? feedback.starRating === filterRating : true)
          .map((feedback) => (
            <Grid item key={feedback._id} xs={12} sm={6} md={4} lg={3}>
              <Card variant="outlined" style={{ height: '100%', backgroundColor: '#f0f0f0' }}>
                <CardContent>
                  <Typography variant="h6">Item Code: {feedback.itemcode}</Typography>
                  <Typography variant="body1">Order ID: {feedback.orderId}</Typography>
                  <Typography variant="body1">Farmer Name: {feedback.farmerName}</Typography>
                  <Typography variant="body1">Rating: <Rating name="read-only" value={feedback.starRating} readOnly /></Typography>
                  <Typography variant="body2">{feedback.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => handleViewDetails(feedback)}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      {/* Feedback Details Dialog */}
      <FeedbackDetailsDialog
        open={openDetailsDialog}
        handleClose={() => setOpenDetailsDialog(false)}
        feedback={selectedFeedback}
      />
    </Container>
  );
};

export default FeedbackCardView;
