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
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import BarChartIcon from '@mui/icons-material/BarChart';
import PopupMessage from '../common/PopUp';

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
    const [fertilizers, setFertilizers] = useState([]);
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');
    const [chartData, setChartData] = useState({});
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




    const fetchFertilizerDataForChart = async () => {
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



    useEffect(() => {
      fetchFertilizerDataForChart();
    }, []);



    useEffect(() => {
      
      if (fertilizers && fertilizers.length > 0) {
          console.log("Fertilizers data:", fertilizers);
          const labels = fertilizers.map(fertilizer => fertilizer.name);
          const quantities = fertilizers.map(fertilizer => fertilizer.quantity);
  
          console.log("Labels:", labels);
          console.log("Quantities:", quantities);
  
          
          console.log("Setting chart data...");
          setChartData({
              labels: labels,
              datasets: [
                  {
                      label: 'Quantity Available',
                      data: quantities,
                      backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      borderColor: 'rgba(255, 99, 18, 1)',
                      borderWidth: 2
                  }
              ]
          });
      } else {
          
          console.log("No fertilizers data available. Setting empty chart data.");
          setChartData({
              labels: [],
              datasets: []
          });
      }
    }, [fertilizers]);



    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };



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
          }, 3000);
          
          setitemcode('');
          setProduct('');
          setPrice('');
          setQuantity('');
        } catch (error) {
          console.error('Error adding product:', error);
          setErrorMessage(error.response.data.error);
        }
      };



    

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
          }, 3000);
          
          } catch (error) {
          console.error('Error updating fertilizer:', error);
          setErrorMessage(error.response.data.error);
        }
      };




    const handleDeleteProduct = async (fertilizerId) => {
        try {
          console.log('Deleting fertilizer with ID:', fertilizerId);
          
          const response = await axios.delete(`http://localhost:8070/dealer/deletefertilizer/${fertilizerId}`);
          
          console.log('Fertilizer deleted successfully:', response.data);
          setSuccessMessage('Product deleted successfulyl');
          setTimeout(() => {
            window.location.reload(); 
          }, 3000);
      
          
          setFertilizers(prevFertilizers => {
            console.log('Updating local state...'); 
            return prevFertilizers.filter(fertilizer => fertilizer._id !== fertilizerId)
          });
          } catch (error) {
          console.error('Error deleting fertilizer:', error);
          setErrorMessage(error.response.data.error);
        }
      };



      const options = {
        scales: {
          x: {
            grid: {
              color: 'black' 
            },
            ticks: {
              color: 'black',
              font: {
                size: 16,
                weight: 'bold' 
              } 
            }
          },
          y: {
            grid: {
              color: 'black' 
            },
            ticks: {
              color: 'black',
              font: {
                size: 16 
              } 
            }
          }
        }
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
    </div>

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
          <Typography variant="body1" className="fertilizer-quantity"><b>Item Code:</b> {fertilizer.itemcode}</Typography>
          <Typography variant="body1" className="fertilizer-price"><b>Price:</b> {fertilizer.price}</Typography>
          <Typography variant="body1" className="fertilizer-quantity"><b>Quantity:</b> {fertilizer.quantity}</Typography>
          
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
            onClick={() => handleDeleteProduct(fertilizer._id)} 
            color="error" 
            sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px' }}>Delete
            </Button>
          </ButtonGroup>
          </div>
        </div>
      </div>
    ))}
  </div>
          
        </div>


        <div className="section update-listings-section light-green-bg">
          <Typography variant="h4"><BarChartIcon style={{ fontSize: 36, color: 'black', marginRight: 8 }}/>
          Quantity Available for each Category</Typography>
          <div className="chart-container">
    {console.log('Chart container rendered')}
    {chartData && Object.keys(chartData).length > 0 && chartData.labels && chartData.datasets ? (
      <Bar data={chartData} options={options} />
    ) : (
      <p>No data available for chart</p>
    )}
  </div>
          
          
        </div>


        

      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </div>
  );
};

export default ManageShop;
