const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../../models/Rahul/Admin');

// POST route to add new admin
router.post('/', async (req, res) => {
  try {
    const { username, password, city, phone, email, address } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({ 
      username, 
      password: hashedPassword,
      city,
      phone,
      email,
      address
    });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET route to retrieve all admins
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE route to delete a specific admin by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT route to update admin details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, city, phone, email, address } = req.body;

    // Hash the password if it's provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Find the admin by ID and update the details
    await Admin.findByIdAndUpdate(id, {
      username,
      ...(hashedPassword && { password: hashedPassword }), // Update password only if provided
      city,
      phone,
      email,
      address
    });

    res.status(200).json({ message: 'Admin updated successfully' });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
