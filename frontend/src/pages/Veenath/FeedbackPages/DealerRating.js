import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
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
       
      }
    };

    fetchAverageRating();
  }, []);

  return (
    <div style={{ marginTop: '30px', color: 'white' }}>
    <Typography variant="h6" align="center" gutterBottom>
      Your Rating
    </Typography>
    <Typography variant="h5" align="center" gutterBottom>
      {averageRating.toFixed(1)}
    </Typography>
    <Box display="flex" justifyContent="center" mb={3}>
      <Rating value={averageRating} precision={0.25} readOnly  />
    </Box>
  </div>
  );
};

export default DealerRating;
