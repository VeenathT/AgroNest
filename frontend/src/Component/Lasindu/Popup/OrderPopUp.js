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
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Invoice from './Invoice';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 10,
  },
});

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
        setOrder(response.data);
        setOrder(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching order details');
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const closeBanner = () => {
    setBannerOpen(false);
    onClose();
  };

  const handleUpdateOrder = () => {
    if (order && order.item && order.item._id) {
      const orderId = order.item._id;
      window.location.href = `/update-order/${orderId}`;
    }
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
              order && (
                <View style={styles.page}>
                  <Text style={styles.text}><MdConfirmationNumber />Order ID: {order.item._id}</Text><br />
                  <Text style={styles.text}><MdShoppingBasket /> Item: {order.item.name}</Text><br />
                  <Text style={styles.text}><MdCode /> Item Code: {order.item.itemcode}</Text><br />
                  <Text style={styles.text}><MdRemoveShoppingCart /> Quantity: {order.item.quantity}</Text><br />
                  <Text style={styles.text}><MdAttachMoney /> Total Price: Rs. {order.item.price}</Text>
                </View>
              )
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateOrder} variant="contained" autoFocus>
              Update
            </Button>
            {order && order.item && order.item._id && (
              <Invoice order={order} />
            )}
            {order && order.item && order.item._id && (
              <DeleteOrderButton orderId={order.item._id} onClose={closeBanner} />
            )}
            <Button onClick={closeBanner} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </TrapFocus>
    </React.Fragment>
  );
}

export default CookiesBanner;
