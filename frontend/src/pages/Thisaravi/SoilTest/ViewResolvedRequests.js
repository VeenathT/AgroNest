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

  return (
    <div>
      <Sidebar />
      <div style={{ maxWidth: 600, paddingLeft: '500px', marginTop:'200px' }}>
        <h2>Resolved Soil Test Requests</h2>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Requests</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resolvedRequests.map((request) => (
                <StyledTableRow key={request._id}>
                  <StyledTableCell component="th" scope="row">
                    {request.soilTestType}
                  </StyledTableCell>
                  <StyledTableCell>{request.status}</StyledTableCell>
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
