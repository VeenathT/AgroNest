// dealerInquiry.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const DealerInquiry = () => {
  const [inquiries, setInquiries] = useState([]);
  const [pendingInquiries, setPendingInquiries] = useState([]);
  const [resolvedInquiries, setResolvedInquiries] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/reports');
        setInquiries(response.data);
        setPendingInquiries(response.data.filter(inquiry => inquiry.status === 'Pending' && inquiry.category === 'Dealer'));
        setResolvedInquiries(response.data.filter(inquiry => inquiry.status === 'Resolved' && inquiry.category === 'Dealer'));
      } catch (error) {
        console.error(error);
      }
    };
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/api/reports/${id}`);
      setInquiries(inquiries.filter(inquiry => inquiry._id !== id));
      setPendingInquiries(pendingInquiries.filter(inquiry => inquiry._id !== id));
      setResolvedInquiries(resolvedInquiries.filter(inquiry => inquiry._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper>
        <Typography variant="h4" gutterBottom>
          Dealer Inquiries
        </Typography>
        <Tabs value={value} onChange={handleChange} aria-label="Inquiry Tabs" textColor="primary" indicatorColor="primary">
          <Tab label="Pending" />
          <Tab label="Resolved" />
        </Tabs>
        {value === 0 &&
          <List>
            {pendingInquiries.map((inquiry) => (
              <div key={inquiry._id}>
                <ListItem>
                  <ListItemText primary={inquiry.name} secondary={inquiry.topic} />
                  <Button onClick={() => handleDelete(inquiry._id)}>Delete</Button>
                  <Link to={`/formPage?id=${inquiry._id}`}>
                    <Button>Update</Button>
                  </Link>
                  <Link to={`/viewInquiry/${inquiry._id}`}>
                    <Button>View</Button>
                  </Link>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        }
        {value === 1 &&
          <List>
            {resolvedInquiries.map((inquiry) => (
              <div key={inquiry._id}>
                <ListItem>
                  <ListItemText primary={inquiry.name} secondary={inquiry.topic} />
                  <Button onClick={() => handleDelete(inquiry._id)}>Delete</Button>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        }
      </Paper>
    </div>
  );
}

export default DealerInquiry;