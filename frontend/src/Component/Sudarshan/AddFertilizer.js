import React, { useState, useEffect } from 'react';
import '../../styles/Sudarshan/manage_shop.css';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { FormControl, InputLabel, MenuItem, Select, TextField,Button} from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
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
import PopupMessage from '../../pages/common/PopUp';
import { Typography} from '@material-ui/core';

const AddFertilizer = () => {
    const [dealerData, setDealerData] = useState({});
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [itemcode, setitemcode] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedProductImage, setSelectedProductImage] = useState('');
    const [dealerId, setDealerId] = useState(null);
    const [fertilizers, setFertilizers] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    useEffect(() => {
    
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
        
        
        console.log('Selected product image path:', imagePath);
      
        setSelectedProductImage(imagePath);
      };

    const handleAddProduct = async (dealerId) => {
        try {

          if (quantity <= 0 || price <= 0 || itemcode < 0) {
            setErrorMessage('Item code, quantity, and price must be positive values.');
            return;
          }

          console.log('Adding product...');
          console.log('Dealer ID:', dealerId);
          console.log('Product details:', {
            name: product,
            price: price,
            quantity: quantity,
            itemcode: itemcode
    });
          
          const response = await axios.post('http://localhost:8070/dealer/addProduct', {
            id: dealerId,
            name: product,
            price: price,
            quantity: quantity,
            itemcode: itemcode
          });
          console.log('Product added successfully:', response.data);
          setSuccessMessage('Product added successfully');
          setTimeout(() => {
            window.location.reload(); 
          }, 2000);
          
          setitemcode('');
          setProduct('');
          setPrice('');
          setQuantity('');
        } catch (error) {
          console.error('Error adding product:', error);
          setErrorMessage(error.response.data.error);
        }
      };

      const handleClosePopup = () => {
        
        setErrorMessage('');
        setSuccessMessage('');
      };

      

  return (
      <div className="section add-items-section green-bg" style={{ position: 'relative', padding: '20px' }}>
      <Typography variant="h4">
          <AddCircleOutline style={{ fontSize: '32px', marginRight: '8px', color:'black' }} />
          Add Items
        </Typography>
        <FormControl fullWidth 
        sx={{
            '& .MuiSelect-iconOutlined': {
                color: 'black' 
              },
              '& .MuiSelect-select': {
                color: 'black', 
                '&:focus': {
                  backgroundColor: 'transparent' 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black' 
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',
              }, 
            }
          }}>
          <InputLabel id="product-label">Select Product</InputLabel>
          <Select
            labelId="product-label"
            id="product"
            value={product}
            InputProps={{
              readOnly: true, 
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
                color: 'black' 
              },
              '& .MuiSelect-select': {
                color: 'white', 
                '&:focus': {
                  backgroundColor: 'transparent' 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black' 
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', 
              }, 
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
                color: 'black' 
              },
              '& .MuiSelect-select': {
                color: 'white', 
                '&:focus': {
                  backgroundColor: 'transparent' 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black' 
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', 
              }, 
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
                color: 'black' 
              },
              '& .MuiSelect-select': {
                color: 'white', 
                '&:focus': {
                  backgroundColor: 'transparent' 
                }
              },
              '& .MuiInputLabel-root': {
                color: 'black', 
                '&.Mui-focused': {
                  color: 'black' 
                }
              },
            marginTop: 2,
            borderRadius: '20px',
            width: '51%',
            '& .MuiOutlinedInput-root': { 
              borderRadius: '20px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black !important',
                borderWidth: '2px',
                boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)', 
              }, 
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
        
        <div style={{ textAlign: 'center', marginTop: '30px' }}> 
        <Button variant="contained" onClick={() => handleAddProduct(dealerId)} sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>
      Add Product
      </Button>
      </div>
      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </div>

      

      
  );
};

export default AddFertilizer;
