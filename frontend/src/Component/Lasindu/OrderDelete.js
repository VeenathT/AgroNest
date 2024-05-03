import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const DeleteOrderButton = ({ orderId }) => {
  const [open, setOpen] = useState(false);

  const handleDeleteOrder = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:8070/order/delete/${orderId}`)
      .then((response) => {
        console.log('Order deleted successfully:', response);
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };

  return (
    <>
      <Button onClick={handleDeleteOrder} variant="outlined" color="error">
        Delete Order
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteOrderButton;
