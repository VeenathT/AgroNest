import React, { useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const InquiryDetailsPopup = ({ inquiry, onClosePopup }) => {
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(false);
    setIsBackdropOpen(true);
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8070/api/reports/${inquiry._id}`);
      setIsDeleteSuccess(true);
      onClosePopup(); // Close the popup after deleting the inquiry
    } catch (error) {
      console.error(error);
    } finally {
      setIsBackdropOpen(false);
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open onClose={onClosePopup}>
      <DialogTitle>Inquiry Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <div>Name: {inquiry.name}</div>
          <div>Topic: {inquiry.topic}</div>
          <div>Description: {inquiry.description}</div>
          <div>Priority: {inquiry.priority}</div>
          <div>Area: {inquiry.area}</div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => setIsDeleteConfirmationOpen(true)}
        >
          Delete
        </Button>
        <a href={`/formPage?id=${inquiry._id}`}>
          <Button variant="contained" color="primary">
            Update
          </Button>
        </a>
        <Button onClick={onClosePopup}>Close</Button>
      </DialogActions>

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this inquiry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
          <Button
            onClick={() => setIsDeleteConfirmationOpen(false)}
            color="primary"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {isBackdropOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
          <LinearProgress />
          {isDeleting && <div style={{ textAlign: 'center' }}>Deleting...</div>}
          {isDeleteSuccess && <div style={{ textAlign: 'center' }}>Delete successful!</div>}
        </div>
      )}
    </Dialog>
  );
};

export default InquiryDetailsPopup;
