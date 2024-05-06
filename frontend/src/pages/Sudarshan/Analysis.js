import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from '../../Component/Sudarshan/Sidebar';
import '../../styles/Sudarshan/manage_shop.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import BarChartIcon from '@mui/icons-material/BarChart';
import PopupMessage from '../common/PopUp';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell} from '@material-ui/core';
import { PDFExport } from '@progress/kendo-react-pdf';
import { TextField,Button, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import npkprime from '../../images/Sudarshan/fertilizer images/npkprime.png';
import urea from '../../images/Sudarshan/fertilizer images/urea.png';
import npkbalanced from '../../images/Sudarshan/fertilizer images/npkbalanced.png';
import tsp from '../../images/Sudarshan/fertilizer images/tsp.png';
import mop from '../../images/Sudarshan/fertilizer images/mop.png';
import algae from '../../images/Sudarshan/fertilizer images/algae.png';
import recovery from '../../images/Sudarshan/fertilizer images/recovery.png';
import xfert from '../../images/Sudarshan/fertilizer images/xfert.png';
import dolomite from '../../images/Sudarshan/fertilizer images/dolomite.png';
import Pdfgen from '../../Component/Sudarshan/pdfgenerator'

const ShopAnalysis = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dealerData, setDealerData] = useState({});
    const navigate = useNavigate();
    const [dealerId, setDealerId] = useState(null);
    const [fertilizers, setFertilizers] = useState([]);
    const [chartData, setChartData] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [pdfExportComponent1, setPdfExportComponent1] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedFertilizer, setSelectedFertilizer] = useState(null);


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


    const handleSort = (property) => {
      const isAsc = sortBy === property && sortOrder === 'asc';
      setSortBy(property);
      setSortOrder(isAsc ? 'desc' : 'asc');
    };


    const stableSort = (array, comparator) => {
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
      });
      return stabilizedThis.map((el) => el[0]);
    };


    const getComparator = (order, sortBy) => {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, sortBy)
        : (a, b) => -descendingComparator(a, b, sortBy);
    };


    const descendingComparator = (a, b, orderBy) => {
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    };


    const headCells = [
      { id: 'itemcode', label: 'Item Code' },
      { id: 'name', label: 'Name' },
      { id: 'quantity', label: 'Quantity' },
      { id: 'price', label: 'Price' },
    ];

    const exportToPdf1 = () => {
      if (pdfExportComponent1) {
          pdfExportComponent1.save();
          setSuccessMessage('PDF Exported');
      }
    };

    const handleSuggestionClick = (fertilizer) => {
      handleSearch(dealerId, fertilizer);
  };

  const handleSearch = (dealerId) => {

    console.log('Searching for fertilizer details with term:', searchTerm);
    console.log('Dealer ID:', dealerId);
    axios.get(`http://localhost:8070/dealer/fertilizers/search?dealerId=${dealerId}&term=${searchTerm}`)
        .then(response => {
          console.log('Fertilizer details fetched successfully:', response.data);
            setSelectedFertilizer(response.data);
            setSuccessMessage('Fertilizer found');
        })
        .catch(error => {
            console.error('Error fetching fertilizer details:', error);
            setErrorMessage(error.response.data.error);
            
        });
};

const handleSearchChange = (event,dealerId) => {
  const { value } = event.target;
  setSearchTerm(value);
  console.log('Searching for suggestions with term:', value);
  console.log('Dealer ID:', dealerId);
  axios.get(`http://localhost:8070/dealer/fertilizers/search?dealerId=${dealerId}&term=${value}`)
      .then(response => {
          console.log('Suggestions fetched successfully:', response.data);
          setSuggestions(response.data);
      })
      .catch(error => {
          console.error('Error fetching suggestions:', error);
      });
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

      <div className="section view-items-section light-green-bg">
            <Typography variant="h4"><SearchIcon style={{ fontSize: 32, color: 'black', marginRight: 8 }}/>Search Fertilizers</Typography>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(event) => handleSearchChange(event, dealerId)}
                    style={{ marginRight: '10px' }}
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
                <Button variant="contained" color="primary" onClick={() => handleSearch(dealerId)} sx={{ borderRadius: '20px',boxShadow: '0 5px 6px rgba(0, 0, 0, 0.6)',fontSize: '15px',marginTop: '10px' }}>Search</Button>
            </div>
            { suggestions.length > 0 && (
    <List>
        {suggestions.map((fertilizer, index) => (
            <ListItem 
            key={index} 
            button 
            onClick={() => handleSuggestionClick(fertilizer,dealerId)}
        >
            <ListItemText primary={fertilizer.name} secondary={`Item Code: ${fertilizer.itemcode}`} />
        </ListItem>
        
        ))}
    </List>
)}

<PDFExport ref={(component) => setPdfExportComponent1(component)} paperSize="B4" >
        {selectedFertilizer && (
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                <div className="img-container">
                    <img src={getFertilizerImage(selectedFertilizer[0].name)} alt={selectedFertilizer[0].name} />
                </div>
                <div className="fertilizer-details" style={{ marginLeft: '20px' }}>
                    <Typography variant="subtitle1" className="fertilizer-name" style={{ fontSize: '25px', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}><b>{selectedFertilizer[0].name}</b></Typography>
                    <Typography variant="body1" className="fertilizer-quantity"><b>Item Code:</b> {selectedFertilizer[0].itemcode}</Typography>
                    <Typography variant="body1" className="fertilizer-price"><b>Price:</b> {selectedFertilizer[0].price}</Typography>
                    <Typography variant="body1" className="fertilizer-quantity"><b>Quantity:</b> {selectedFertilizer[0].quantity}</Typography>
                </div>
            </div>
        )}
    </PDFExport>

    {selectedFertilizer && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button onClick={exportToPdf1} variant="contained" color="primary" sx={{
                color: 'white',
                marginTop: '10px',
                borderRadius: '20px',
                '&:hover': {
                    backgroundColor: 'darkblue',
                },
            }}>
                Export to PDF
            </Button>
        </div>
    )}
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

        <div className="section update-listings-section light-green-bg">
          <Typography variant="h4"><SummarizeIcon style={{ fontSize: 36, color: 'black', marginRight: 8 }}/>
          Generate Stock Reports</Typography>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
    < Pdfgen fertilizers={fertilizers} />
</div>
            
                <Table>
                    <TableHead>
                        <TableRow>
                            {headCells.map((headCell) => (
                                <TableCell key={headCell.id}>
                                    <Button onClick={() => handleSort(headCell.id)} style={{ fontSize: '1.1rem' }}>
                                        {headCell.label}
                                        {sortBy === headCell.id && (
                                            sortOrder === 'asc' ? ' ▲' : ' ▼'
                                        )}
                                    </Button>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
          {stableSort(fertilizers, getComparator(sortOrder, sortBy)).map((fertilizer, index) => (
            <TableRow key={index}>
              <TableCell>{fertilizer.itemcode}</TableCell>
              <TableCell>{fertilizer.name}</TableCell>
              <TableCell>{fertilizer.quantity}</TableCell>
              <TableCell>{fertilizer.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
                </Table>

        </div>

      </div>
      <Sidebar open={sidebarOpen} onClose={toggleSidebar} dealerName={dealerData?.name} handleEditProfile={handleEditProfile} />

      {successMessage && <PopupMessage message={successMessage} type="success" onClose={handleClosePopup} />}
      {errorMessage && <PopupMessage message={errorMessage} type="error" onClose={handleClosePopup} />}
    </div>
  );
};

export default ShopAnalysis;
