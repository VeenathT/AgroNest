import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Sudarshan/manage_shop.css';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { useLocation, useNavigate } from 'react-router-dom';
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

const ManageShop = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dealerData, setDealerData] = useState({});
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [itemcode, setitemcode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductImage, setSelectedProductImage] = useState('');
    const navigate = useNavigate();
    const [dealerId, setDealerId] = useState(null);


    useEffect(() => {
    // Fetch dealer's data from backend
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
        const dealerId = data.id;
        console.log('Dealer ID:', dealerId);
        setDealerId(dealerId);
      } catch (error) {
        console.error('Error fetching dealer data:', error);
      }
    };

    fetchDealerData();
    }, []);

  const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

  const handleEditProfile = () => {
        navigate('/editProf');
    };

    const handleProductChange = (event) => {
        const selectedProduct = event.target.value;
        setSelectedProduct(selectedProduct);

        let selectedProductName = '';

    switch (selectedProduct) {
        case 'NPKprime':
            selectedProductName = 'NPKprime';
            break;
        case 'NPKbalanced':
            selectedProductName = 'NPKbalanced';
            break;
        case 'MOP':
            selectedProductName = 'MOP';
            break;
            case 'TSP':
            selectedProductName = 'TSP';
            break;
            case 'Urea':
            selectedProductName = 'Urea';
            break;
            case 'Dolomite':
            selectedProductName = 'Dolomite';
            break;
            case 'X-Fert':
            selectedProductName = 'X-Fert';
            break;
            case 'Recovery':
            selectedProductName = 'Recovery';
            break;
            case 'Algaesolidstar':
            selectedProductName = 'Algaesolidstar';
            break;
        // Add more cases for other products
        default:
            selectedProductName = '';
    }

    setProduct(selectedProductName);
      
        let imagePath = '';
      
        if (selectedProduct === 'NPKprime') {
          imagePath = npkprime;
        } else if (selectedProduct === 'NPKbalanced') {
          imagePath = npkbalanced;
        } else if (selectedProduct === 'MOP') {
          imagePath = mop;
        } else if (selectedProduct === 'TSP') {
          imagePath = tsp;
        } else if (selectedProduct === 'Urea') {
          imagePath = urea;
        } else if (selectedProduct === 'Dolomite') {
          imagePath = dolomite;
        } else if (selectedProduct === 'X-Fert') {
          imagePath = xfert;
        } else if (selectedProduct === 'Recovery') {
          imagePath = recovery;
        } else if (selectedProduct === 'Algaesolidstar') {
          imagePath = algae;
        }
        // Add more conditions for other products
        
        console.log('Selected product image path:', imagePath);
      
        setSelectedProductImage(imagePath);
      };

      const handleAddProduct = async (dealerId) => {
        try {

          console.log('Adding product...');
    console.log('Dealer ID:', dealerId);
    console.log('Product details:', {
      name: product,
      price: price,
      quantity: quantity,
      itemcode: itemcode
    });
          // Send a request to add the product with the selected data
          const response = await axios.post('http://localhost:8070/dealer/addProduct', {
            id: dealerId,
          name: product,
            price: price,
            quantity: quantity,
            itemcode: itemcode
          });
          console.log('Product added successfully:', response.data);
          // Clear input fields after successful addition
          setitemcode('');
          setProduct('');
          setPrice('');
          setQuantity('');
        } catch (error) {
          console.error('Error adding product:', error);
        }
      };

  const handleEditProduct = (productId) => {
    // Redirect to the edit product page with the productId
    navigate(`/edit-product/${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    // Implement delete product functionality
    // You can send a delete request to your backend to delete the product
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


      <div className="section add-items-section green-bg" style={{ position: 'relative', padding: '20px' }}>
      <Typography variant="h4">
          <AddCircleOutline style={{ fontSize: '32px', marginRight: '8px', color:'black' }} />
          Add Items
        </Typography>
        <FormControl fullWidth 
        sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' // Icon color
              },
              '& .MuiSelect-select': {
                color: 'black', // Text color
                '&:focus': {
                  backgroundColor: 'transparent' // Remove focus background color
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Label color
                '&.Mui-focused': {
                  color: 'black' // Focused label color
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { // Select the root element of the outlined input
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', // Border color
              }, // Apply border radius to the root element
            }
          }}>
          <InputLabel id="product-label">Select Product</InputLabel>
          <Select
            labelId="product-label"
            id="product"
            value={product}
            InputProps={{
              readOnly: true, // Make the input field read-only
          }}
            onChange={(e) => handleProductChange(e)}
            label="Select Product"
          >
            <MenuItem value="NPKprime">NPK prime</MenuItem>
            <MenuItem value="NPKbalanced">NPK balanced</MenuItem>
            <MenuItem value="MOP">MOP</MenuItem>
            <MenuItem value="TSP">TSP</MenuItem>
            <MenuItem value="Urea">Urea</MenuItem>
            <MenuItem value="Recovery">Recovery</MenuItem>
            <MenuItem value="Dolomite">Dolomite</MenuItem>
            <MenuItem value="X-Fert">X-Fert</MenuItem>
            <MenuItem value="Algaesolidstar">Algae Solid Star</MenuItem>
            {/* Add more MenuItem components as needed */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          id="id"
          label="Item Code"
          type="number"
          value={itemcode}
          onChange={(e) => setitemcode(e.target.value)}
          sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' // Icon color
              },
              '& .MuiSelect-select': {
                color: 'white', // Text color
                '&:focus': {
                  backgroundColor: 'transparent' // Remove focus background color
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Label color
                '&.Mui-focused': {
                  color: 'black' // Focused label color
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { // Select the root element of the outlined input
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', // Border color
              }, // Apply border radius to the root element
            }
          }}
        />
        <TextField
          fullWidth
          id="price"
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' // Icon color
              },
              '& .MuiSelect-select': {
                color: 'white', // Text color
                '&:focus': {
                  backgroundColor: 'transparent' // Remove focus background color
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Label color
                '&.Mui-focused': {
                  color: 'black' // Focused label color
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { // Select the root element of the outlined input
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', // Border color
              }, // Apply border radius to the root element
            }
          }}
        />
        <TextField
          fullWidth
          id="quantity"
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' // Icon color
              },
              '& .MuiSelect-select': {
                color: 'white', // Text color
                '&:focus': {
                  backgroundColor: 'transparent' // Remove focus background color
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Label color
                '&.Mui-focused': {
                  color: 'black' // Focused label color
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { // Select the root element of the outlined input
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', // Border color
              }, // Apply border radius to the root element
            }
          }}
        />
         <div style={{ position: 'absolute', top: 95, right: 80 , border: '3px solid black', boxShadow: '0 8px 8px rgba(0, 0, 0, 0.6)', borderRadius: '20px'}}>
            <Card sx={{ width: 250, height: 250, borderRadius: '20px' }}>
            <CardMedia
                component="img"
                height="280"
                image={selectedProductImage}
/>
            </Card>
          </div>
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}> {/* Container for the button */}
    <Button variant="contained" onClick={() => handleAddProduct(dealerId)} sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>
      Add Product
    </Button>
  </div>
</div>


        
        <div className="section view-items-section light-green-bg">
          <Typography variant="h4"><StorefrontOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>View All Items</Typography>
          {/* Add the component or list to view all items */}
          <ul>
            {/* Render a list of items */}
            {/* Example: */}
            <li>
              Product 1
              <button onClick={() => handleEditProduct()}>Edit</button>
              <button onClick={() => handleDeleteProduct()}>Delete</button>
            </li>
            {/* Add more items */}
          </ul>
        </div>
        <div className="section update-listings-section dark-green-bg">
          <Typography variant="h4"><UpdateOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>Update Listings</Typography>
          {/* Add the form or components for updating listings */}
          {/* Example: */}
          <input type="text" placeholder="Enter product ID" />
          <button onClick={() => handleEditProduct()}>Edit Product</button>
        </div>
        <div className="section delete-listings-section green-bg">
          <Typography variant="h4"><RemoveCircleOutlineOutlinedIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>Delete Listings</Typography>
          {/* Add the form or components for deleting listings */}
          {/* Example: */}
          <input type="text" placeholder="Enter product ID" />
          <button onClick={() => handleDeleteProduct()}>Delete Product</button>
        </div>
      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />
    </div>
  );
};

export default ManageShop;
