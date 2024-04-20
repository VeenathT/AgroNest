import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Typography, Grid, Button, Paper, Box, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const ItemView = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8070/item/get/${id}`)
      .then((res) => {
        const { status, item } = res.data;
        if (status === "Item Fetched") {
          setItem(item);
          setLoading(false);
          console.log("Item fetched successfully:", item);
        } else {
          setLoading(false);
          setError("Error fetching item");
          console.error("Error fetching item:", res.data.error);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Error fetching item");
        console.error("Error fetching item:", error);
      });
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  const getTotalPrice = () => {
    if (item) {
      return item.price * quantity;
    }
    return 0;
  };

  const handleBuyNow = () => {
    const orderDetails = {
      name: item.name,
      itemcode: item.itemcode,
      quantity: quantity,
      price: getTotalPrice(),
    };
  
    // Send orderDetails to backend for order placement
    axios.post('http://localhost:8070/order/add', orderDetails)
      .then((response) => {
        console.log("Order placed successfully:", response);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };
  

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'rgba(144, 238, 144, 0.6)' }}>
      <Container maxWidth="md">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <Paper elevation={3} style={{ padding: '20px', backgroundColor: 'white' }}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
              <Grid item xs={12} md={6}>
                <img src="/R.jfif" alt={item.name} style={{ width: '100%', height: 'auto' }} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Item Code: {item.itemcode}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Rs. {item.price}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Available Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: 
                  <TextField
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    inputProps={{ min: 1, max: item.quantity}}
                    style={{ width: '70px', marginLeft: '10px' }}
                  />
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Total Price: Rs. {getTotalPrice()}
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Button variant="contained" color="primary" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                  <Typography variant="body2">
                    Money-back guarantee
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <img src="/visa.png" alt="Visa" style={{ width: 'auto', height: '30px', marginRight: '10px' }} />
                  <img src="/master.png" alt="Mastercard" style={{ width: 'auto', height: '70px' }} />
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default ItemView;
