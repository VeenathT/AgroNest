import axios from 'axios';
import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  LinearProgress,
  Typography, // Add Typography import
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  textDecoration: 'none',
};
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
  },
});

const InquiryDetailsPopup = ({ inquiry, onClosePopup }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    const fetchReplies = async (dealerId) => {
      try {
        const response = await axios.get(`http://localhost:8070/api/repo/dealers/:id/reply`);
        setReplies(response.data);
      } catch (error) {
        console.error('Error fetching replies:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (inquiry.status === 'Resolved') {
      fetchReplies(inquiry._id);
    }
  }, [inquiry.status, inquiry._id]);

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Inquiry Details</Text>
          <Text style={styles.detail}>Name: {inquiry.name}</Text>
          <Text style={styles.detail}>Topic: {inquiry.topic}</Text>
          <Text style={styles.detail}>Description: {inquiry.description}</Text>
          <Text style={styles.detail}>Priority: {inquiry.priority}</Text>
          <Text style={styles.detail}>Area: {inquiry.area}</Text>
        </View>
      </Page>
    </Document>
  );

  return (
    <Dialog open onClose={onClosePopup} maxWidth="md" fullWidth>
      <DialogTitle>Inquiry Details</DialogTitle>
      <DialogContent dividers>
        <div>
          <Typography variant="subtitle1">Name:</Typography>
          <Typography>{inquiry.name}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Topic:</Typography>
          <Typography>{inquiry.topic}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Description:</Typography>
          <Typography>{inquiry.description}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Priority:</Typography>
          <Typography>{inquiry.priority}</Typography>
        </div>
        <div>
          <Typography variant="subtitle1">Area:</Typography>
          <Typography>{inquiry.area}</Typography>
        </div>
        {inquiry.status === 'Resolved' && (
          <div>
            <Typography variant="subtitle1">Replies:</Typography>
            {loading ? (
              <LinearProgress />
            ) : error ? (
              <Typography color="error">{error}</Typography>
            ) : (
              replies.map((reply, index) => (
                <div key={index}>
                  <Typography>{reply.replyText}</Typography>
                </div>
              ))
            )}
          </div>
        )}
      </DialogContent>
      <DialogActions>
        {inquiry.status === 'Pending' && (
          <>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setIsDeleteConfirmationOpen(true)}
            >
              Delete
            </Button>
            <a href={`/formPage?id=${inquiry._id}`}>
              <Button variant="contained" color="info" startIcon={<EditIcon />}>
                Update
              </Button>
            </a>
          </>
        )}
        <Button onClick={onClosePopup}>Close</Button>
        {inquiry.status === 'Resolved' && (
          <PDFDownloadLink document={<MyDocument />} fileName="inquiry_details.pdf">
          {({ blob, url, loading, error }) => (
            <a
              style={buttonStyle}
              href={url}
              download="inquiry_details.pdf"
              onClick={loading ? (e) => e.preventDefault() : null}
            >
              {loading ? 'Loading document...' : 'Download'}
            </a>
          )}
        </PDFDownloadLink>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default InquiryDetailsPopup;
