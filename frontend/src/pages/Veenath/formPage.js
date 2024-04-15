import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState(location.search.split('=')[1]);
  const [area, setArea] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const inquiryId = new URLSearchParams(location.search).get('id');

  useEffect(() => {
    const fetchInquiryDetails = async () => {
      try {
        if (inquiryId) {
          const response = await axios.get(`http://localhost:8070/api/reports/${inquiryId}`);
          const { name, topic, description, priority, area } = response.data;
          setName(name);
          setTopic(topic);
          setDescription(description);
          setPriority(priority);
          setArea(area);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInquiryDetails();
  }, [location.search, inquiryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessDialogOpen(true);
  };

  const handleConfirmSend = async () => {
    try {
      if (inquiryId) {
        await axios.put(`http://localhost:8070/api/reports/${inquiryId}`, {
          name,
          topic,
          description,
          priority,
          category,
          area
        });
        setSuccessMessage('Inquiry updated successfully!');
      } else {
        await axios.post('http://localhost:8070/api/reports', {
          name,
          topic,
          description,
          priority,
          category,
          area
        });
        setSuccessMessage('Inquiry submitted successfully!');
      }
      setSuccessDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4">{inquiryId ? 'Update Inquiry' : 'Submit Inquiry'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          margin="normal"
        />
        <Divider orientation="vertical" flexItem style={{ margin: '10px 0' }} />
        <TextField
          select
          fullWidth
          label="Select Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          margin="normal"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Category"
          value={category}
          disabled
          margin="normal"
        />
        <TextField
          fullWidth
          label="Area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Send
        </Button>
      </form>
      <Dialog open={successDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Are you sure to send this?</DialogTitle>
        <DialogContent>
          <DialogContentText>{successMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmSend} color="primary">Yes</Button>
          <Button onClick={handleCloseDialog} color="primary">No</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FormPage;
