import React, { useState, useEffect } from 'react';
import { Typography, Container, Box } from '@mui/material';
import { Rating } from '@mui/material';
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
      <Typography variant="h6" align="center" gutterBottom>
        Reviews and Ratings
      </Typography>
      <Typography variant="h3" align="center" gutterBottom>
        {averageRating.toFixed(1)}
      </Typography>
      <Box display="flex" justifyContent="center" mb={3}>
        <Rating value={averageRating} precision={0.5} readOnly />
      </Box>
    </Container>
  );
};

export default DealerRating;
