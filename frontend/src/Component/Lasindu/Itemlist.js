import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper } from '@mui/material';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8070/item/displayAll')
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
        backgroundImage: `url('/paddy.jpg')`, 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        padding: '20px'
    }}>
      <Container maxWidth="md" style={{ marginTop: '100px'}}>
        <Typography variant="h4" gutterBottom style={{ color: 'black', textAlign: 'center' }}>
          Available Items
        </Typography>
        <Grid container spacing={3}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error.message}</Typography>
          ) : (
            items.map(item => (
              <Grid item key={item._id} xs={12} sm={6} md={4}>
                <Paper style={{ padding: '20px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#00563F', color: 'white' }}>
                  <Link to={`/item/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography variant="h6" gutterBottom style={{ color: 'white'}}>
                      {item.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom style={{ color: 'black'}}>
                      Rs. {item.price}
                    </Typography>
                    <Typography variant="body2" gutterBottom style={{ color: 'black'}}>
                      Available Quantity: {item.quantity}
                    </Typography>
                  </Link>
                </Paper>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default ItemList;
