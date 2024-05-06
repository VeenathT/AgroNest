import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateOrderDialog = ({ open, onClose }) => {
  const { id } = useParams();
  const [updatedOrder, setUpdatedOrder] = useState({
    quantity: '',
    price: '',
  });
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/order/get/${id}`);
        const item = response.data.item;
        setItemName(item.name);
        setUpdatedOrder((prevOrder) => ({
          ...prevOrder,
          price: item.price * updatedOrder.quantity,
        }));
      } catch (error) {
        console.log('Error fetching item details:', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));

    try {
      const response = await axios.get(`http://localhost:8070/order/get/${id}`);
      const itemPrice = response.data.item.price;

      const newPrice = itemPrice * parseInt(value);
      setUpdatedOrder((prevOrder) => ({
        ...prevOrder,
        price: newPrice,
      }));
    } catch (error) {
      console.log('Error fetching item price:', error);

    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8070/order/update/${id}`, updatedOrder);
      window.location.href='/Order-History'
      onClose();
    } catch (error) {
      console.log('Error updating order:', error);

    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '16px' }}>Fertilizer : {itemName}</div>
        <TextField
          fullWidth
          margin="normal"
          label="Quantity"
          name="quantity"
          value={updatedOrder.quantity}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          value={isNaN(updatedOrder.price) ? '' : String(updatedOrder.price)}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" autoFocus>
          Update
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateOrderDialog;
