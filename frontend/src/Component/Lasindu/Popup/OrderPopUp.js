import React from 'react';
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
import { MdConfirmationNumber, MdShoppingBasket, MdCode, MdAttachMoney, MdRemoveShoppingCart } from 'react-icons/md';
import axios from 'axios';
import DeleteOrderButton from '../OrderDelete';

const CookiesBanner = ({ onClose, orderId }) => {
  const [bannerOpen, setBannerOpen] = React.useState(true);
  const [order, setOrder] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8070/order/get/${orderId}`);
        setOrder(response.data); // Set the order object
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
    const orderId = order.item._id; // Assuming order ID is stored in order._id
    // Navigate to the update-order route with the order ID
    window.location.href = `/update-order/${orderId}`;
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
              order && ( // Check if order exists before rendering
                <Typography variant="body2">
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <MdConfirmationNumber style={{ marginRight: '0.5rem' }} /> Order ID: {order.item._id}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <MdShoppingBasket style={{ marginRight: '0.5rem' }} /> Item: {order.item.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <MdCode style={{ marginRight: '0.5rem' }} /> Item Code: {order.item.itemcode}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <MdRemoveShoppingCart style={{ marginRight: '0.5rem' }} /> Quantity: {order.item.quantity}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MdAttachMoney style={{ marginRight: '0.5rem' }} /> Total Price: Rs. {order.item.price}
                  </div>
                </Typography>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateOrder} variant="contained" autoFocus>
              Update
            </Button>
            {order && order.item && order.item._id && (
              <DeleteOrderButton orderId={order.item._id} onClose={closeBanner} />
            )}
          </DialogActions>
        </Dialog>
      </TrapFocus>
    </React.Fragment>
  );
}

export default CookiesBanner;
