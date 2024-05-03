import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Box } from '@mui/material';

const FeedbackDetailsDialog = ({ open, handleClose, feedback }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Feedback Details</DialogTitle>
      <DialogContent>
        <Box bgcolor="#f5f5f5" p={2} borderRadius={5} boxShadow={3}>
          <Typography variant="h6">Name: {feedback?.farmerName}</Typography>
          <Typography variant="body1">Item Code: {feedback?.itemcode}</Typography>
          <Typography variant="body1">Order ID: {feedback?.orderId}</Typography>
          <Typography variant="body2">Description: {feedback?.description}</Typography>
          <Typography variant="body1">Rating: {feedback?.starRating}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDetailsDialog;
