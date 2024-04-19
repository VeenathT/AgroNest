import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch order history from the backend
    axios.get('http://localhost:8070/order/displayAll')
      .then((response) => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching order history');
        setLoading(false);
      });
  }, []);

  const handleUpdateOrder = (orderId) => {
    // Handle update logic here
    console.log('Updating order with ID:', orderId);
  };

  const handleDeleteOrder = (orderId) => {
    // Handle delete logic here
    console.log('Deleting order with ID:', orderId);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Order History
      </Typography>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <List sx={{ backgroundColor: 'rgba(144, 238, 144, 0.5)', marginTop: '50px' }}>
          {orders.map((order) => (
            <div key={order._id}>
              <ListItem>
                <ListItemText 
                  primary={`Name: ${order.name}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="textPrimary">
                        Order ID: {order._id}
                      </Typography>
                      <br />
                      Item Code: {order.itemcode} | 
                      Price: Rs. {order.price} | 
                      Quantity: {order.quantity}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleUpdateOrder(order._id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteOrder(order._id)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Container>
  );
};

export default OrderHistoryPage;
