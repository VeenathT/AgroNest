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

const ViewResolvedRequests = () => {
  const navigate = useNavigate();
  const [resolvedRequests, setResolvedRequests] = useState([]);

  useEffect(() => {
    const fetchResolvedRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8070/SoilTest/getResolvedRequests');
        setResolvedRequests(response.data);
      } catch (error) {
        console.error('Error fetching resolved soil test requests:', error);
      }
    };

    fetchResolvedRequests();
  }, []);

  // Function to handle downloading or viewing PDF
  const fetchAndOpenPDF = async (labReportId) => {
    try {
      // Fetch the PDF data from the backend
      const response = await fetch(`http://localhost:8070/labReport/get-pdf/${labReportId}`);
      
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch PDF');
      }
      
      // Convert the response to blob
      const pdfBlob = await response.blob();
      
      // Create a URL for the blob
      const pdfUrl = URL.createObjectURL(pdfBlob);
      
      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error viewing PDF:', error);
    }
  };

  return (
    <div>
      <Sidebar />
      <div style={{ maxWidth: 800, paddingLeft: '500px', marginTop:'200px' }}>
        <h2>Resolved Soil Test Requests</h2>
        <TableContainer component={Paper} style={{ height: '100%', width: '800px' }}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Requests</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell> {/* Add a column for the action */}
              </TableRow>
            </TableHead>
            <TableBody>
              {resolvedRequests.map((request) => (
                <StyledTableRow key={request._id}>
                  <StyledTableCell component="th" scope="row">
                    {request.soilTestType}
                  </StyledTableCell>
                  <StyledTableCell>{request.status}</StyledTableCell>
                  <StyledTableCell>
                    <button onClick={() => fetchAndOpenPDF("6634e948082542634bf35d6b")}>View PDF</button>
                  </StyledTableCell> {/* Button to view PDF */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ViewResolvedRequests;
