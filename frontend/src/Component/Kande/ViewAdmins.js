import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: '',
    city: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8070/api/admin');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    setDeleteUserId(id);
    setConfirmationOpen(true);
  };

  const handleUpdate = (user) => {
    setSelectedUser(user);
    setUpdatedUser({
      username: user.username,
      city: user.city,
      phone: user.phone,
      email: user.email,
      address: user.address
    });
    setUpdateDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/api/admin/${deleteUserId}`);
      // Refresh the user list after deletion
      const response = await axios.get('http://localhost:8070/api/admin');
      setUsers(response.data);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
    setConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setConfirmationOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
  };

  const handleUpdateInputChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:8070/api/admin/${selectedUser._id}`, updatedUser);
      // Refresh the user list after update
      const response = await axios.get('http://localhost:8070/api/admin');
      setUsers(response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
    setUpdateDialogOpen(false);
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <h2>User Table</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleDelete(user._id)}>Delete</Button>
                <Button variant="contained" color="secondary" onClick={() => handleUpdate(user)}>Update</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={confirmationOpen} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
          <Button onClick={cancelDelete} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="username"
            label="Username"
            value={updatedUser.username}
            onChange={handleUpdateInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            label="City"
            value={updatedUser.city}
            onChange={handleUpdateInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            label="Phone"
            value={updatedUser.phone}
            onChange={handleUpdateInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            value={updatedUser.email}
            onChange={handleUpdateInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            value={updatedUser.address}
            onChange={handleUpdateInputChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateSubmit} color="primary">
            Update
          </Button>
          <Button onClick={handleCloseUpdateDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
