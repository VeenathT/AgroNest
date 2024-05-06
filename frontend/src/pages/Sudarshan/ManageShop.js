import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Sudarshan/manage_shop.css';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { TextField,Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import npkprime from '../../images/Sudarshan/fertilizer images/npkprime.png';
import urea from '../../images/Sudarshan/fertilizer images/urea.png';
import npkbalanced from '../../images/Sudarshan/fertilizer images/npkbalanced.png';
import tsp from '../../images/Sudarshan/fertilizer images/tsp.png';
import mop from '../../images/Sudarshan/fertilizer images/mop.png';
import algae from '../../images/Sudarshan/fertilizer images/algae.png';
import recovery from '../../images/Sudarshan/fertilizer images/recovery.png';
import xfert from '../../images/Sudarshan/fertilizer images/xfert.png';
import dolomite from '../../images/Sudarshan/fertilizer images/dolomite.png';
import { ButtonGroup } from '@mui/material';
import PopupMessage from '../common/PopUp';
import { Typography} from '@material-ui/core';
import AddFertilizer from '../../Component/Sudarshan/AddFertilizer';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

const ManageShop = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dealerData, setDealerData] = useState({});
    const navigate = useNavigate();
    const [dealerId, setDealerId] = useState(null);
    const [fertilizers, setFertilizers] = useState([]);
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
    const [fertilizerToDeleteId, setFertilizerToDeleteId] = useState(null);
    


    useEffect(() => {
    //dealer data fetch
      const fetchDealerData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8070/dealer/dealers', {
              headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        console.log('Dealer data:', data);
        setDealerData(data);
        const dealerId = data._id;
        console.log('Dealer ID:', dealerId);
        setDealerId(dealerId);

        const fertilizersResponse = await axios.get(`http://localhost:8070/dealer/${dealerId}/fertilizers`);
        console.log('Fertilizers response:', fertilizersResponse);
                setFertilizers(fertilizersResponse.data);
                console.log('Fertilizers:', fertilizersResponse.data);
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };

      fetchDealerData();
      }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };


//edit profile
    const handleEditProfile = () => {
        navigate('/editProf');
    };

    const handlePriceChange = (event, fertilizerId) => {
        const { value } = event.target;
        console.log('Price value:', value);
        console.log('Fertilizer ID:', fertilizerId);
        setUpdatedPrice(prevState => ({
          ...prevState,
          [fertilizerId]: {
            ...prevState[fertilizerId],
            price: value
          }
        }));
    };


      
    const handleQuantityChange = (event, fertilizerId) => {
        const { value } = event.target;
        console.log('Quantity value:', value);
        console.log('Fertilizer ID:', fertilizerId);
        setUpdatedQuantity(prevState => ({
          ...prevState,
          [fertilizerId]: {
            ...prevState[fertilizerId],
            quantity: value
          }
        }));
    };

    const getFertilizerImage = (fertilizerName) => {
        switch (fertilizerName) {
            case 'NPKprime':
                return npkprime;
            case 'NPKbalanced':
                return npkbalanced;
            case 'MOP':
                return mop;
            case 'TSP':
                return tsp;
            case 'Urea':
                return urea;
            case 'Dolomite':
                return dolomite;
            case 'X-Fert':
                return xfert;
            case 'Recovery':
                return recovery;
            case 'Algaesolidstar':
                return algae;
            default:
                return npkprime; 
        }
      };

      //update
      const handleUpdateFertilizer = async (fertilizerId, updatedPrice, updatedQuantity) => {
        try {
          console.log('Updating fertilizer:', { fertilizerId, updatedPrice, updatedQuantity });

          const price = updatedPrice[fertilizerId]?.price;
          const quantity = updatedQuantity[fertilizerId]?.quantity;
          console.log('Price:', price);
          console.log('Quantity:', quantity);
          
          const response = await axios.put(`http://localhost:8070/dealer/updatefertilizers/${fertilizerId}`, {
            price: price,
            quantity: quantity
          });
          console.log('Fertilizer updated successfully:', response.data);
          setSuccessMessage('Product updated successfully');
          setTimeout(() => {
            window.location.reload(); 
          }, 2000);
          
          } catch (error) {
          console.error('Error updating fertilizer:', error);
          setErrorMessage(error.response.data.error);
        }
      };




      //delete
    const handleDeleteProduct = async (fertilizerId) => {
        try {
          console.log('Deleting fertilizer with ID:', fertilizerId);
          
          const response = await axios.delete(`http://localhost:8070/dealer/deletefertilizer/${fertilizerId}`);
          
          console.log('Fertilizer deleted successfully:', response.data);
          setSuccessMessage('Product deleted successfully');
      
          
          setFertilizers(prevFertilizers => {
            console.log('Updating local state...'); 
            return prevFertilizers.filter(fertilizer => fertilizer._id !== fertilizerId)
          });

          setShowConfirmationDialog(false);
          } catch (error) {
          console.error('Error deleting fertilizer:', error);
          setErrorMessage(error.response.data.error);
        }
      };

      const handleClosePopup = () => {
        
        setErrorMessage('');
        setSuccessMessage('');
      };

      const handleOpenConfirmationDialog = (fertilizerId) => {
        setFertilizerToDeleteId(fertilizerId);
        setShowConfirmationDialog(true);
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

      
        <AddFertilizer />
      

      

        <div className="section view-items-section light-green-bg">
          <Typography variant="h4"><StorefrontOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>View All Items</Typography>
          
          <div className="fertilizer-list">
    {fertilizers.map((fertilizer, index) => (
      <div key={index} className="fertilizer-item">
         <div className="image-container">
          <img src={getFertilizerImage(fertilizer.name)} alt={fertilizer.name} />
        </div>
        <div className="fertilizer-details">
          <Typography variant="subtitle1" className="fertilizer-name" style={{ fontSize: '25px', color: 'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}><b>{fertilizer.name}</b></Typography>
          <Typography variant="body1" className="fertilizer-quantity"style={{ color: 'black' }}><b>Item Code:</b> {fertilizer.itemcode}</Typography>
          <Typography variant="body1" className="fertilizer-price"style={{ color: 'black' }}><b>Price:</b> {fertilizer.price}</Typography>
          <Typography variant="body1" className="fertilizer-quantity"style={{ color: 'black' }}><b>Quantity:</b> {fertilizer.quantity}</Typography>
          
        </div>
      </div>
    ))}
  </div>
        </div>


        <div className="section update-listings-section dark-green-bg">
          <Typography variant="h4"><UpdateOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>
          Update Listings / <RemoveCircleOutlineOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>Delete Listings</Typography>
          
          <div className="fertilizer-list">
    {fertilizers.map((fertilizer, index) => (
      <div key={index} className="fertilizer-item">
         <div className="image-container">
          <img src={getFertilizerImage(fertilizer.name)} alt={fertilizer.name} />
        </div>
        <div className="fertilizer-details">
          <Typography variant="subtitle1" className="fertilizer-name" style={{ fontSize: '25px', color: 'white',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}><b>{fertilizer.name}</b></Typography>
          <Typography variant="body1" className="fertilizer-quantity"><b>Item Code:</b> {fertilizer.itemcode}</Typography>
          <TextField
              variant="outlined"
              placeholder={fertilizer.price}
              className="fertilizer-price"
              value={(updatedPrice[fertilizer._id] || {}).price || ''}
              onChange={(event) => handlePriceChange(event, fertilizer._id)}
              InputProps={{
    startAdornment: <b>Price:</b>,
    sx: {
      '& .MuiInputBase-input': {
        color: 'black', 
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black !important',
        borderWidth: '2px',
        boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)' 
      },
      borderRadius: '20px',
    },
  }}
  style={{ width: 'calc(80% - 8px)', marginRight: '8px', marginTop: '16px' }} 
/>

<TextField
  variant="outlined"
  placeholder={fertilizer.quantity}
  className="fertilizer-quantity"
  value={(updatedQuantity[fertilizer._id] || {}).quantity || ''}
  onChange={(event) => handleQuantityChange(event, fertilizer._id)}
  InputProps={{
    startAdornment: <b>Quantity:</b>,
    sx: {
      '& .MuiInputBase-input': {
        color: 'black', 
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black !important',
        borderWidth: '2px',
        boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)' 
      },
      borderRadius: '20px',
    },
  }}
  style={{ width: 'calc(80% - 8px)', marginRight: '8px',  marginTop: '16px' }} 
/>

          <div className="button-container">
          <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>
            <Button 
            onClick={() => handleUpdateFertilizer(fertilizer._id, updatedPrice, updatedQuantity)} 
            color="primary" 
            sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>Update
            </Button>

            <Button 
            onClick={() => handleOpenConfirmationDialog(fertilizer._id)} 
            color="error" 
            sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>Delete
            </Button>
          </ButtonGroup>
          </div>
        </div>
      </div>
    ))}
  </div>
  <Dialog open={showConfirmationDialog} onClose={() => setShowConfirmationDialog(false)}>
        <DialogTitle>Are you sure you want to delete fertilizer?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDeleteProduct(fertilizerToDeleteId)} color="error">Yes</Button>
          <Button onClick={() => setShowConfirmationDialog(false)}>No</Button>
        </DialogActions>
      </Dialog>
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </div>
  );
};

export default ManageShop;
