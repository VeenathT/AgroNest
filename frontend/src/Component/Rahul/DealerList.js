import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable } from 'material-react-table';
import { Box, Button, Grid } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Sidebar from './Sidebar'; // Import Sidebar component here

const columnHelper = createMRTColumnHelper();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Dark blue color
    },
  },
});

const DealerList = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8070/viewdealers');
        setDealers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    
    columnHelper.accessor('name', {
      header: 'Name',
      size: 120,
    }),

    columnHelper.accessor('address', {
      header: 'Address',
      size: 120,
    }),

    columnHelper.accessor('email', {
      header: 'Email',
      size: 200,
    }),
    columnHelper.accessor('phone', {
      header: 'Phone',
      size: 150,
    }),
    columnHelper.accessor('storeLocation', {
      header: 'Store Location',
      size: 200,
    }),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(dealers);
    download(csvConfig)(csv);
  };

  const table = useMaterialReactTable({
    columns,
    data: dealers,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
      sx={{
        display: 'flex',
        gap: '12px',
        padding: '8px',
        flexWrap: 'wrap',
        marginTop: '90px',
        justifyContent: 'flex-start', 
      }}
      >
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
  });

  return (
    <Grid container>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={9}>
        <ThemeProvider theme={theme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
};

export default DealerList;
