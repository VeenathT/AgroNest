import React from 'react';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StoreIcon from '@mui/icons-material/Store';
import FeedbackIcon from '@mui/icons-material/Feedback';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import '../../styles/Sudarshan/sidebar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Sidebar = ({ open, onClose, dealerName, handleEditProfile }) => {


  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="sidebar-container">
        
        <Avatar alt="Dealer" src="" className="avatar" style={{ marginTop: '30px', boxShadow: '0 0 10px green' }} />
        <Typography variant="h6" align="center">{dealerName}</Typography>
        <hr />
        <List>
          <ListItemButton onClick={handleEditProfile}>
            <ListItemIcon><EditIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton component="a" href="/manage-shop">
            <ListItemIcon><StoreIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Manage Shop" />
          </ListItemButton>
          <ListItemButton component="a" href="/feedbacks">
            <ListItemIcon><FeedbackIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Feedbacks" />
          </ListItemButton>
          <ListItemButton component="a" href="/inquiries">
            <ListItemIcon><QuestionAnswerIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Inquiries" />
          </ListItemButton>
          <ListItemButton component="a" href="/orders">
            <ListItemIcon><ShoppingCartIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          <ListItemButton component="a" href="/logout">
            <ListItemIcon><ExitToAppIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
          
        </List>
        
      </div>
      
    </Drawer>
  );
};

export default Sidebar;
