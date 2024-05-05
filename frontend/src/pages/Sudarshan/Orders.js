import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Sudarshan/manage_shop.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PopupMessage from '../common/PopUp';
import { Typography} from '@material-ui/core';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { TextField,Button} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';

const Orders = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dealerData, setDealerData] = useState({});
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [orderToDeleteId, setOrderToDeleteId] = useState(null);
    


    useEffect(() => {
    fetchData();
      
      }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8070/order/displayAll');
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleUpdateStatus = async (itemId) => {
      try {
          await axios.put(`http://localhost:8070/order/update/${itemId}`, { status: 'Confirmed' });
          console.log('Status updated successfully');
          setSuccessMessage('Order Confirmed successfully');
          fetchData();
      } catch (error) {
          console.error('Error updating status:', error);
      }
  };

  const handleUpdateStatusR = async (itemId) => {
    try {
        await axios.put(`http://localhost:8070/order/update/${itemId}`, { status: 'Rejected' });
        console.log('Status updated successfully');
        setSuccessMessage('Order Rejected successfully');
        setShowConfirmationDialog(false);
        fetchData();
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

    const handleOpenConfirmationDialog = (orderId) => {
      setOrderToDeleteId(orderId);
      setShowConfirmationDialog(true);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleEditProfile = () => {
        navigate('/editProf');
    };

    const handleClosePopup = () => {
        
        setErrorMessage('');
        setSuccessMessage('');
    };

  return (
    <div className="container">
      <div className="header"> 
        <IconButton onClick={toggleSidebar} edge="start" className="sidebar-button"> 
          <MenuIcon />
        </IconButton>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name || ''} />


      <div className="content">

        <div className="section view-items-section light-green-bg">
          <Typography variant="h4"><LocalMallOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>View All Pending Orders</Typography>

          <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%', marginTop:'40px' }}>
                <thead>
                <tr style={{ border: '2px solid black' }}>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Name</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Item Code</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Price</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Quantity</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Current Status</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Change Status</th>
            
        </tr>
                </thead>
                <tbody>
                {orders.filter(order => order.status === 'Pending').map(order => (
                        <tr key={order._id} style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.name}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.itemcode}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.price}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.quantity}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.status}</td>
                        <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                          <Button variant="contained" color="primary" onClick={() => handleUpdateStatus(order._id)} style={{ borderRadius: '20px', marginBottom: '5px',marginRight:'10px' }}>
                              Confirm
                          </Button>
                          <Button variant="contained" color="error"  onClick={() => handleOpenConfirmationDialog(order._id)} style={{ borderRadius: '20px',marginBottom: '5px',marginLeft:'10px' }}>
                              Reject
                          </Button>
                        </td>
                       
                    </tr>
                    ))}
                </tbody>
            </table>

            <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <DialogTitle>Are you sure you want to reject order?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleUpdateStatusR(orderToDeleteId)} color="error">Yes</Button>
          <Button onClick={() => setShowConfirmationDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>

        </div>


        <div className="section view-items-section light-green-bg">
          <Typography variant="h4"><CheckOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>View All Confirmed Orders</Typography>

          <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%', marginTop:'40px' }}>
                <thead>
                <tr style={{ border: '2px solid black' }}>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Name</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Item Code</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Price</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Quantity</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Current Status</th>
           
        </tr>
                </thead>
                <tbody>
                {orders.filter(order => order.status === 'Confirmed').map(order => (
                        <tr key={order._id} style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.name}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.itemcode}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.price}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.quantity}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.status}</td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>


        </div>

        <div className="section view-items-section light-green-bg">
          <Typography variant="h4"><DoDisturbOnOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>View All Rejected Orders</Typography>

          <table style={{ border: '2px solid black', borderCollapse: 'collapse', width: '100%', marginTop:'40px' }}>
                <thead>
                <tr style={{ border: '2px solid black' }}>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Name</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Item Code</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Price</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Quantity</th>
            <th style={{ border: '2px solid black', padding: '12px', textAlign: 'left', color: 'black', textAlign: 'center', fontSize: '20px' }}>Current Status</th>
            
        </tr>
                </thead>
                <tbody>
                {orders.filter(order => order.status === 'Rejected').map(order => (
                        <tr key={order._id} style={{ border: '1px solid black' }}>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.name}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.itemcode}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.price}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.quantity}</td>
                        <td style={{ border: '1px solid black', padding: '10px', color: 'black', fontSize: '17px' }}>{order.status}</td>
                        
                    </tr>
                    ))}
                </tbody>
            </table>


        </div>

      </div>


      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </div>
  );
};

export default Orders;
