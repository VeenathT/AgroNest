import React, { useMemo, useState, useEffect } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Menu, MenuItem, Grid, Typography } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon, GetApp as GetAppIcon } from '@mui/icons-material';
import axios from 'axios';
import ConfirmationDialog from './ConfirmationDialog';
import Sidebar from './Sidebar';

export const Example = () => {
  const [data, setData] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFarmer, setSelectedFarmer] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8070/viewfarmers'); // Fetch farmer data
        if (!response.ok) {
          throw new Error('Failed to fetch farmers');
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'first_name',
        header: 'Name',
        size: 120,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        size: 130,
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
        size: 110,
      },
      
    ],
    []
  );

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + data.map(row => Object.values(row).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "farmers.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteConfirmation = (farmer) => {
    setSelectedFarmer(farmer);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    const id = selectedFarmer._id;
    try {
      const response = await axios.delete(`http://localhost:8070/viewfarmers/delete/${id}`); // Delete farmer
      if (response.status === 200) {
        const newData = data.filter(farmer => farmer._id !== id);
        setData(newData);
      } else {
        console.error('Failed to delete farmer:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting farmer:', error);
    }
    setConfirmOpen(false);
    setSelectedFarmer(null);
  };

  return (
    <div style={{ marginTop: '120px' }}>
      <Typography variant="h6" style={{ marginLeft: '265px', marginBottom: '-10px' }}>Registered Farmers</Typography>
      <Grid container>
        <Grid item xs={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={9} style={{ marginLeft: '265px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6"> </Typography>
            <IconButton onClick={handleExportCSV}>
              <GetAppIcon />
            </IconButton>
          </Box>
          <MaterialReactTable
            className="custom-table"
            columns={columns}
            data={data}
            layoutMode="grid"
            displayColumnDefOptions={{
              'mrt-row-actions': {
                size: 180,
                grow: false,
              },
            }}
            enableRowActions
            renderRowActions={({ row, table }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '1px' }}>
                <IconButton
                  color="primary"
                  onClick={() =>
                    window.open(
                      `mailto:${row.original.email}?subject=Hello ${row.original.name}!`
                    )
                  }
                >
                  <EmailIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => {
                    table.setEditingRow(row);
                  }}
                >
                  
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteConfirmation(row.original)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
            toolbar={(
              <div>
                <IconButton onClick={handleMenuOpen}>
                  <GetAppIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleExportCSV}>Export CSV</MenuItem>
                </Menu>
              </div>
            )}
          />
        </Grid>
      </Grid>
      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Example;
