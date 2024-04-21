import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material';
import CookiesBanner from '../Lasindu/Popup/OrderPopUp'; // Import the CookiesBanner component

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to store the selected order ID

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

  const handleViewOrder = (orderId) => {
    setSelectedOrderId(orderId); // Set the selected order ID
    console.log('View order:', orderId);
  };

  const handleCloseBanner = () => {
    setSelectedOrderId(null); // Reset selected order ID when the banner is closed
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
        Array.isArray(orders) && orders.length > 0 ? (
          <List sx={{ backgroundColor: 'rgba(144, 238, 144, 0.7)', marginTop: '50px' }}>
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
                  <Button variant="contained" onClick={() => handleViewOrder(order._id)} sx={{ background:'green'}}>View</Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        ) : (
          <div>No orders found</div>
        )
      )}
      {selectedOrderId && <CookiesBanner onClose={handleCloseBanner} orderId={selectedOrderId} />} {/* Render the banner component if selectedOrderId is not null */}
    </Container>
  );
};

export default OrderHistoryPage;
