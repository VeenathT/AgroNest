import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateOrderDialog = ({ open, onClose }) => {
  const { id } = useParams(); // Retrieve the order ID from URL parameters
  const [updatedOrder, setUpdatedOrder] = useState({
    quantity: '',
    price: '',
  });
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    // Fetch the item details when the component mounts
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
  }, [id]); // Fetch item details when the ID changes

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Update the quantity in the updatedOrder state
    setUpdatedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));

    // Fetch the item details from the server based on the item ID
    try {
      const response = await axios.get(`http://localhost:8070/order/get/${id}`);
      const itemPrice = response.data.item.price;

      // Calculate the new price based on the updated quantity
      const newPrice = itemPrice * parseInt(value); // Assuming itemPrice is in the same currency as the price in the database

      // Update the price in the updatedOrder state
      setUpdatedOrder((prevOrder) => ({
        ...prevOrder,
        price: newPrice,
      }));
    } catch (error) {
      console.log('Error fetching item price:', error);
      // Handle error gracefully
    }
  };

  const handleSubmit = async () => {
    try {
      // Send a PUT request to update the order in the database
      await axios.put(`http://localhost:8070/order/update/${id}`, updatedOrder);
      window.location.href='/Order-History'
      onClose(); // Close the dialog after successful update
    } catch (error) {
      console.log('Error updating order:', error);
      // Handle error gracefully
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Order</DialogTitle>
      <DialogContent>
        <div style={{ marginBottom: '16px' }}>Fertilizer : {itemName}</div>
        {/* Input fields for updating order details */}
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
