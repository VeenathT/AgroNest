
const Admin = require('../../models/Rahul/Admin');
const bcrypt = require('bcrypt');
// routes/adminProfile.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// Middleware 
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET || '16811', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    req.adminId = decoded.id;
    next();
  });
};

// Get admin profile data
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
