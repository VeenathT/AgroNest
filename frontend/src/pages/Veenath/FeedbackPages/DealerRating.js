import React, { useState, useEffect } from 'react';
import { Typography, Container } from '@mui/material';
import axios from 'axios';

const DealerRating = () => {
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/feedbacks');
        const ratings = response.data.feedbacks.map((feedback) => feedback.starRating);
        const average =
          ratings.length > 0 ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length : 0;
        setAverageRating(average);
      } catch (err) {
        console.error(err);
        // Add error handling here
      }
    };

    fetchAverageRating();
  }, []);

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF'}} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Dealer Rating
      </Typography>
      <Typography variant="h6" align="center">
        Average Rating: {averageRating}
      </Typography>
    </Container>
  );
};

export default DealerRating;
