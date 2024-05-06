import React from 'react';
import Drawer from '@mui/material/Drawer';
import { List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import StoreIcon from '@mui/icons-material/Store';
import FeedbackIcon from '@mui/icons-material/Feedback';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import '../../styles/Sudarshan/sidebar.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const Sidebar = ({ open, onClose, dealerName, handleEditProfile }) => {


  return (
    <Drawer anchor="left" open={open} onClose={onClose} >
      <div className="sidebar-container" style={{ marginTop: '150px' }}>
        
        <Typography variant="h4" align="center">{dealerName}</Typography>
        <hr />
        <List>
          <ListItemButton onClick={handleEditProfile}>
            <ListItemIcon><EditIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton component="a" href="/manageShop">
            <ListItemIcon><StoreIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Manage Shop" />
          </ListItemButton>
          <ListItemButton component="a" href="/analysis">
            <ListItemIcon><StoreIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Shop Analysis" />
          </ListItemButton>
          <ListItemButton component="a" href="/FeedbackCardView">
            <ListItemIcon><FeedbackIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Feedbacks" />
          </ListItemButton>
          <ListItemButton component="a" href="/dealerInquiry">
            <ListItemIcon><QuestionAnswerIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Inquiries" />
          </ListItemButton>
          <ListItemButton component="a" href="/orders">
            <ListItemIcon><ShoppingCartIcon style={{ color: 'green' }} /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
          
        </List>
        
      </div>
      
    </Drawer>
  );
};

export default Sidebar;
