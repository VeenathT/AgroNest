import * as React from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Button, Paper, Box, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

const ItemView = () => {
  const { id } = useParams();
  const [item, setItem] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState(null);
  const [paymentInfo, setPaymentInfo] = React.useState({ cardNumber: '', expiryDate: '', cvv: '' });
  const [openPaymentDialog, setOpenPaymentDialog] = React.useState(false);
  const [openPaymentInfoDialog, setOpenPaymentInfoDialog] = React.useState(false);
  const [isPayNowDisabled, setIsPayNowDisabled] = React.useState(true);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = React.useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = React.useState(false);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const isValidCardNumber = /^[0-9]{16}$/.test(paymentInfo.cardNumber);
    const isValidExpiryDate = /^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(paymentInfo.expiryDate);
    const isValidCVV = /^[0-9]{3}$/.test(paymentInfo.cvv);

    setIsPayNowDisabled(!(isValidCardNumber && isValidExpiryDate && isValidCVV));
  }, [paymentInfo]);

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
    setOpenConfirmationDialog(true);
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
    setOpenPaymentDialog(false);
    setOpenPaymentInfoDialog(true);
  };

  const handlePaymentInfoSubmit = () => {
    const farmer = localStorage.getItem('logId');
    console.log("Token : ",farmer)
    const orderDetails = {
      name: item.name,
      itemcode: item.itemcode,
      quantity: quantity,
      price: getTotalPrice(),
      farmerId: farmer
    };

    axios.post('http://localhost:8070/order/add', orderDetails)
      .then((response) => {
        console.log("Order placed successfully:", response);
        setOpenPaymentInfoDialog(false);
        setOpenSuccessSnackbar(true);
      })
      .catch((error) => {
        console.error("Error placing order:", error);
      });
  };

  const handleCardNumberChange = (event) => {
    const cardNumber = event.target.value.replace(/\D/g, '');
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      cardNumber: cardNumber,
    }));
  };

  const handleExpiryDateChange = (event) => {
    const expiryDate = event.target.value.replace(
      /[^0-9/]/g, ''
    ).replace(
      /(\d\d)\/?(\d\d)?/,
      (_, m, y) => (m.length === 2 && parseInt(m, 10) <= 12 ? `${m}/${y || ''}` : '')
    );
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      expiryDate: expiryDate,
    }));
  };

  const handleCVVChange = (event) => {
    const cvv = event.target.value.replace(/\D/g, '');
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      cvv: cvv,
    }));
  };

  const handleConfirmOrder = () => {
    setOpenConfirmationDialog(false);
    setOpenPaymentDialog(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '120vh' }}>
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
                  <Typography variant="body2">
                    Accepted Payment Methods:
                  </Typography>
                  <Typography variant="body2">
                    Visa, Mastercard
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>

      <Dialog open={openConfirmationDialog} onClose={() => setOpenConfirmationDialog(false)}>
        <DialogTitle>Are you sure you want to place this order?</DialogTitle>
        <DialogActions>
          <Button onClick={handleConfirmOrder} color="primary">
            Yes
          </Button>
          <Button onClick={() => setOpenConfirmationDialog(false)} color="secondary">
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openPaymentDialog} onClose={() => setOpenPaymentDialog(false)}>
        <DialogTitle>Select Payment Method</DialogTitle>
        <DialogContent>
          <Button onClick={() => handlePaymentMethodSelect('Visa')}>Visa</Button>
          <Button onClick={() => handlePaymentMethodSelect('Mastercard')}>Mastercard</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={openPaymentInfoDialog} onClose={() => setOpenPaymentInfoDialog(false)}>
        <DialogTitle>Enter Payment Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handleCardNumberChange}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { maxLength: 16 },
            }}
          />
          <TextField
            label="Expiry Date (MM/YYYY)"
            value={paymentInfo.expiryDate}
            onChange={handleExpiryDateChange}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { maxLength: 7 },
            }}
          />
          <TextField
            label="CVV"
            value={paymentInfo.cvv}
            onChange={handleCVVChange}
            fullWidth
            margin="normal"
            InputProps={{
              inputProps: { maxLength: 3 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePaymentInfoSubmit} color="primary" disabled={isPayNowDisabled}>
            Pay Now
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Order placed successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ItemView;
