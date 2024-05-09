import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, Box, Divider, Rating } from '@mui/material';

const FeedbackDetailsDialog = ({ open, handleClose, feedback }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Feedback Details</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6">Name: {feedback?.farmerName}</Typography>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Typography marginLeft={2} variant="subtitle2">Item Code: {feedback?.itemcode}</Typography>
          <Typography marginLeft={2} marginTop={1} variant="subtitle2">Order ID: {feedback?.orderId}</Typography>
          <Divider sx={{ mt: 1, mb: 1 }} />
          <Box sx={{ bgcolor: '#ffff', p: 2, borderRadius: 1, boxShadow: 1 }}>
            <Typography variant="subtitle2">Description:</Typography>
            <Typography variant="body2">{feedback?.description}</Typography>
          </Box>
          <Divider sx={{ mt: 2, mb: 1 }} />
          <Typography marginLeft={2} variant="subtitle2">Rating:</Typography>
          <Box marginTop={1} marginLeft={1} sx={{ display: 'flex', alignItems: 'center' }}>
            <Rating value={feedback?.starRating} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>{feedback?.starRating}/5</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button  style={{ backgroundColor: 'green' , color:'white' }} onClick={handleClose} >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackDetailsDialog;
