import React, { useState } from 'react';
import axios from 'axios';
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
import { PDFDownloadLink, PDFViewer, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

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
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isBackdropOpen, setIsBackdropOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);

  const handleDelete = async () => {
    setIsDeleteConfirmationOpen(false);
    setIsBackdropOpen(true);
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:8070/api/reports/${inquiry._id}`);
      setIsDeleteSuccess(true);
      onClosePopup(); 
      setTimeout(() => {
        window.location.reload(); 
      }, 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsBackdropOpen(false);
      setIsDeleting(false);
    }
  };

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

      <Dialog
        open={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this inquiry?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
            Yes
          </Button>
          <Button
            onClick={() => setIsDeleteConfirmationOpen(false)}
            color="primary"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      {isBackdropOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
          <LinearProgress />
          {isDeleting && <div style={{ textAlign: 'center' }}>Deleting...</div>}
          {isDeleteSuccess && <div style={{ textAlign: 'center' }}>Delete successful!</div>}
        </div>
      )}
    </Dialog>
  );
};

export default InquiryDetailsPopup;
