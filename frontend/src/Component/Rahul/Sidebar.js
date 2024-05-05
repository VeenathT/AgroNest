import React from 'react';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BiotechIcon from '@mui/icons-material/Biotech';
import FeedbackIcon from '@mui/icons-material/Feedback';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 180,
    marginTop: '110px',
    backgroundColor: 'purewhite',
  },
}));

const Sidebar = ({ farmerID }) => {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <List>
        <ListItem button component={Link} to={`/adminp`}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
       
        <ListItem button component={Link} to="/viewdealers"> 
          <ListItemText primary="Dealers" />
        </ListItem>

        <ListItem button component={Link} to="/viewfarmers"> 
        <ListItemText primary="Farmers" />
        </ListItem>


        <ListItem button component={Link} to="/labrotaryview">
          <ListItemText primary="Laboratory" />
        </ListItem>

        <ListItem button component={Link} to="/userreports">  
        <ListItemText primary="Inquiries" />
        </ListItem>

        <ListItem button component={Link} to="/addarticle"> 
          <ListItemText primary="Articles " />
          
        </ListItem>

        <ListItem button components={Link} to="/">
         
          <ListItemText primary="Promotion" />
          
          
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
