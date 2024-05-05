import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Component/Thisaravi/Sidebar';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ViewRequests = () => {
  const navigate = useNavigate();

  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8070/SoilTest/getPendingRequests');
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching soil test requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleView = (requestId) => {
    navigate(`/soil-test/${requestId}`);
  };

  const handleUpdate = (requestId) => {
    navigate(`/update-request/${requestId}`);
  };

  const handleDelete = (requestId) => {
    setSelectedRequestId(requestId);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/SoilTest/delete/${selectedRequestId}`);

      const response = await axios.get('http://localhost:8070/SoilTest/getPendingRequests');
      setPendingRequests(response.data);
    } catch (error) {
      console.error('Error deleting soil test request:', error);
    } finally {
      setOpenModal(false);
      setSelectedRequestId(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequestId(null);
  };

  return (
    <div>
      <Sidebar />
      <div style={{ maxWidth: 800, paddingLeft: '500px', marginTop:'200px' }}>
        <h2>Soil Test Requests</h2>
        <TableContainer component={Paper} style={{ height: '100%', width: '800px' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Requests</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRequests.map((request) => (
                <StyledTableRow key={request._id}>
                  <StyledTableCell component="th" scope="row">
                    {request.soilTestType}
                  </StyledTableCell>
                  <StyledTableCell>{request.status}</StyledTableCell>
                  <StyledTableCell>
                    <button onClick={() => handleView(request._id)}>View</button>
                    <button onClick={() => handleUpdate(request._id)}>Update</button>
                    <button onClick={() => handleDelete(request._id)}>Delete</button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="delete-confirmation-modal-title"
        aria-describedby="delete-confirmation-modal-description"
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
          <h2 id="delete-confirmation-modal-title">Confirm Delete</h2>
          <p id="delete-confirmation-modal-description">Are you sure you want to delete the request?</p>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">Yes</Button>
          <Button onClick={handleCloseModal} variant="contained" color="primary">No</Button>
        </div>
      </Modal>
    </div>
  );
};

export default ViewRequests;