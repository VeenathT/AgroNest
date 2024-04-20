import * as React from 'react';
import TrapFocus from '@mui/material/Unstable_TrapFocus';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function CookiesBanner({ onClose, orderId }) {
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [orderDetails, setOrderDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8070/order/get/${orderId}`);
        console.log('Response data:', response.data); // Check if response data is logged correctly
        setOrderDetails(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]); // Fetch order details when orderId changes

  const closeBanner = () => {
    setBannerOpen(false);
    onClose();
  };

  const handleUpdateOrder = () => {
    console.log('Updating order', orderId);
  };

  const handleDeleteOrder = () => {
    console.log('Deleting order');
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" component="nav">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ pt: 3 }}>
        <Toolbar />
      </Container>
      <TrapFocus open disableAutoFocus disableEnforceFocus>
        <Dialog
          open={bannerOpen}
          onClose={closeBanner}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Order Details</DialogTitle>
          <DialogContent>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography>Error: {error}</Typography>
            ) : (
              orderDetails && (
                <Typography variant="body2">
                  Order ID: {orderDetails._id}<br />
                  Item: {orderDetails.name}<br />
                  Quantity: {orderDetails.quantity}<br />
                  Total Price: Rs. {orderDetails.price}
                </Typography>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateOrder} variant="contained" autoFocus>
              Update
            </Button>
            <Button onClick={handleDeleteOrder}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </TrapFocus>
    </React.Fragment>
  );
}
