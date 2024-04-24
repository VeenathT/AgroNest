import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PastFeedbackList = () => {
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/feedbacks/${id}`);
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
    } catch (err) {
      console.error(err);
      // Add error handling here
    }
  };

  return (
    <Container style={{ marginTop: '100px', backgroundColor: '#FFFF'}} maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Past Feedback Forms
      </Typography>
      <List>
        {feedbacks.map((feedback) => (
          <ListItem key={feedback._id}>
            <ListItemText
              primary={`Item Code: ${feedback.itemcode}`}
              secondary={`Rating: ${feedback.starRating}`}
            />
            <ListItemText primary={feedback.description} />
            <Button
              component={Link}
              to={{
                pathname: '/FeedbackForm',
                state: {
                  feedbackToEdit: feedback,
                },
              }}
            >
              Edit
            </Button>
            <Button onClick={() => handleDelete(feedback._id)}>Delete</Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PastFeedbackList;
