import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';

// import AdminHome from '../../pages/AdminHome';
import DealerListComponent from '../Rahul/DealerListComponent';
import FarmerListComponent from './FarmerListComponent';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
      <Grid item xs={3}>
        <Sidebar />
      </Grid>
    <Box sx={{display: 'flex', justifyContent: 'center', marginTop:'110px', marginLeft:'180px', height: '100vh',left:'200px'}}>
    <Box sx={{ bgcolor: '#cde3c3', width: 1130,height:720 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="green"
          
          textColor="inherit"
          variant="fullWidth"
        
          aria-label="full width tabs example"
        >
          <Tab label="Dealer" {...a11yProps(0)} sx={{ bgcolor: 'green' }} />
          <Tab label="Farmer" {...a11yProps(1)} sx={{ bgcolor: 'green' }} />
          
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
         <DealerListComponent/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <FarmerListComponent/>
        </TabPanel>
        
      </SwipeableViews>
    </Box>
    </Box>
    </div>
  );
}
