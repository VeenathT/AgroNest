import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container } from '@mui/material';
import axios from 'axios';

const FeedbackCardView = () => {
  const [feedbacks, setFeedbacks] = useState([]);

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

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF'}} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        All Feedbacks
      </Typography>
      {feedbacks.map((feedback) => (
        <Card key={feedback._id} variant="outlined" style={{ marginBottom: '10px' }}>
          <CardContent>
            <Typography variant="h6">Item Code: {feedback.itemcode}</Typography>
            <Typography variant="body1">Rating: {feedback.starRating}</Typography>
            <Typography variant="body2">{feedback.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default FeedbackCardView;
